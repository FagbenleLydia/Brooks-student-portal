const cors = require('cors');
const course = require('../models/Course');

exports.createCourse = async(req, res, next) => {
    try {
        console.log("request entered");
        const newCourse = new course({ ...req.body, teacher: req.user._id });
        console.log(`${newCourse}`);
        const savedCourse = await newCourse.save();
        console.log(`${savedCourse}`);
        return res.status(201).json({
            success: true,
            message: "Course created Successfuly", 
            data: savedCourse})
            
        }
        catch (error) {
        next(error);

    }
}

exports.registerCourse = async(req, res, next) => {
    try {
        const courseId = req.params.id;
        console.log ('Course ID from params:', courseId); // Debug log
        const studentId = req.user._id;
        const courseData = await course.findById(courseId);
        console.log('Course found:', courseData);   
        if (!courseData) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (!courseData.isActive) {
            return res.status(400).json({ message: 'Course is not active' });
        }
        //check if the student is already registered for the course
        if (courseData.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ message: 'Student already registered for this course' });
        }
        courseData.enrolledStudents.push(studentId);  // Create the relationship by adding the student ID to the course's students array
        const updatedCourse = await courseData.save();
        return res.status(200).json({success: true, message: 'course enrollment successful', data: updatedCourse});
    }
    catch (error) {
        next(error);
    }
}

exports.getAllCourses = async(req, res, next) => {
    try {
        const courses = await course.find();
        return res.status(200).json(courses);
    }
    catch (error) {
        next(error);
    }
}
exports.getCourseById = async(req, res, next) => {
    try {
        const courseId = req.params.id;
        console.log('Course ID from params:', courseId); // Debug log
        const courseData = await course.findById(courseId);
        if (!courseData) {
            return res.status(404).json({ message: 'Course not found' });
        }
        console.log('Course found:', courseData); // Debug log
        return res.status(200).json(courseData);
    }
    catch (error) {
        next(error);
    }
}