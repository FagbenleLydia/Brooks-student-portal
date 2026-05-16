const Result = require('../models/result');
const User = require('../models/User');
const Course = require('../models/Course');
const Student = require('../models/Student');

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

        if ((score < 0 || score > 100) || isNaN(score)){
            return res.status(400).json({error: 'Invalid Score'})
        }

        //checking if the student registered for a particular course 
        const validateStudent = await User.findOne({authUserId: studentID});
        if(!validateStudent){
            return res.status(404).json({error: 'Student does not exist'});
        }

        const validateCourse = await Course.findOne({courseCode: course});
        if(!validateCourse){
            return res.status(404).json({error: 'Course does not exist'});
        }

        if(!validateCourse.enrolledStudents.includes(studentID)){
            return res.status(404).json({error: 'Student not enrolled in course'})
        }

        //Teacher server verification
        const teacher = req.user.id

        //calculate grade from score
        const grade = calculateGrade(score);

        //Save Result
        const result = await Result.create({
            StudentId: studentID,
            Level: level,
            Course: course,
            Lecturer: teacher,
            Semester: semester,
            Score: score,
            Grade: grade
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
        const{courseCode,level,semester,department} = req.query;

        const teacherId = req.user.id;

        const foundCourse = await Course.findOne({teacher: teacherId, courseCode: courseCode});

        if(!foundCourse){
            return res.status(404).json({error: 'Invalid Credentials'});
        }

        const results = await Result.find({
            course: foundCourse._id,
            level,
            department,
            semester
    
        }).select(['studentID score grade'])

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