const Result = require('../models/result');
const User = require('../models/User');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Session = require('../models/Session');

function calculateGrade(score) {
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    if (score >= 45) return 'D';
    if (score >= 40) return 'E';
    return 'F';
}

exports.postResult = async (req,res) => {
    try{
        const{studentID,level,course,semester,score} = req.body

        if(!studentID ||!level||!course||!semester||score===undefined||score===null){
            return res.status(400).json({error: 'All fields are required'})
        }

        const validLevels = ['100','200','300','400','500','600','Spill-Over'];

        if (!validLevels.includes(level)){
            return res.status(400).json({error: 'Invalid Level'})
        }

        const validSemester = ['first','second'];

        if(!validSemester.includes(semester)){
            return res.status(400).json({error: 'Invalid Semester'});
        }

        if (isNaN(score) || score < 0 || score > 100){
            return res.status(400).json({error: 'Invalid Score'})
        }

        // Find the user by their authUserId
        const studentUser = await User.findOne({authUserId: studentID});
        if(!studentUser){
            return res.status(404).json({error: 'Student does not exist'});
        }

        // Find the student profile linked to that user
        const studentDoc = await Student.findOne({user: studentUser._id});
        if(!studentDoc){
            return res.status(404).json({error: 'Student profile not found'});
        }

        const validateCourse = await Course.findOne({courseCode: course});
        if(!validateCourse){
            return res.status(404).json({error: 'Course does not exist'});
        }

        // enrolledStudents holds User ObjectIds — compare correctly
        const isEnrolled = validateCourse.enrolledStudents.some(id => id.equals(studentUser._id));
        if(!isEnrolled){
            return res.status(404).json({error: 'Student not enrolled in course'})
        }

        // Get the active session
        const currentSession = await Session.findOne({isCurrent: true});
        if(!currentSession){
            return res.status(404).json({error: 'No active session found. Please set a current session.'});
        }

        const teacher = req.user._id;
        const grade = calculateGrade(score);

        const result = await Result.create({
            studentID: studentDoc._id,
            course: validateCourse._id,
            teacher,
            session: currentSession._id,
            level,
            semester,
            score,
            grade
        });

        return res.status(200).json({
            message: 'Result uploaded successfully',
            result
        });

    }

    catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.getStudentResult = async (req,res) =>{
    try{
        const userId = req.user.id;

        const student = await Student.findOne({user: userId});

        if(!student){
            return res.status(404).json({error: 'Student not found'});
        }

        const results = await Result.find({studentID: student._id});

        if (results.length===0){
            return res.status(404).json({error: 'Results not found'});
        }

        res.status(200).json({
            message: 'Result found successfully',
            results
        });
    }

    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.getCourseResults = async (req,res) => {
    try{
        const{courseCode,level,semester} = req.query;

        const teacherId = req.user.id;

        const foundCourse = await Course.findOne({teacher: teacherId, courseCode: courseCode});

        if(!foundCourse){
            return res.status(404).json({error: 'Invalid Credentials'});
        }

        const results = await Result.find({
            course: foundCourse._id,
            level,
            semester
        }).select('studentID score grade')

        if(results.length===0){
            return res.status(404).json({error: 'No result found'})
        }

        res.status(200).json({
            message: 'Results retrieved successfully',
            results
        })
    }

    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.updateResult = async (req,res) => {
    try{
        const{id} = req.params;
        const{score} = req.body;
        const teacherId = req.user.id

        if(!id){
            return res.status(400).json({error: 'Result does not exist'})
        }
        const existingResult = await Result.findOne({_id:id, teacher: teacherId});

        if(!existingResult){
            return res.status(400).json({error: 'Result not found'})
        }

        if (score === undefined || score === null) {
            return res.status(400).json({ error: 'Score is required' });
        }
        if (isNaN(score) || score < 0 || score > 100) {
            return res.status(400).json({ error: 'Invalid score' });
        }

        const grade = calculateGrade(score)

        const resultUpdated = await Result.findByIdAndUpdate(
            id,
            {score,grade},
            {new: true}

        );

        return res.status(200).json({
            message: 'Result updated successfully',
            resultUpdated
        })
    }

    catch(err){
        return res.status(500).json({error: err.message})
    }
}

exports.getAdminSearch = async (req, res) => {
    try {
        const { studentID, level } = req.query;


        if (!studentID || !level) {
            return res.status(400).json({ error: 'Student ID and level are required' });
        }

        // find the user by their authUserId
        const student = await User.findOne({ authUserId: studentID });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // find their student document
        const studentDoc = await Student.findOne({ user: student._id });
        if (!studentDoc) {
            return res.status(404).json({ error: 'Student profile not found' });
        }

        // find all their results filtered by level
        const results = await Result.find({
            studentID: studentDoc._id,
            level
        })
        .populate('course', 'title courseCode')
        .populate('teacher', 'firstName lastName');

        if (results.length === 0) {
            return res.status(404).json({ error: 'No results found' });
        }

        return res.status(200).json({
            message: 'Results retrieved successfully',
            student: {
                name: `${student.firstName} ${student.lastName}`,
                authUserId: student.authUserId,
                level
            },
            results
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};