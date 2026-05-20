const express = require('express');
const router = express.Router();

const { registerCourse, getCourseById, getAllCourses, createCourse } = require('../controllers/course.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.post('/register-course/:id', protect, authorize('student'), registerCourse);
router.get('/courses/:id', protect, getCourseById);
router.get('/courses', protect, getAllCourses);
router.post('/create-courses', protect, authorize('teacher'), createCourse);

module.exports = router;