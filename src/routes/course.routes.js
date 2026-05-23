const express = require('express');
const router = express.Router();
const { validateFaculty, validateCourse } = require("../middlewares/validate.middleware");

const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');


router.post('/', protect, authorize('teacher'), validateCourse, createCourse);

router.get('/', protect, getCourses);

router.get('/:id', protect, getCourse);

router.put('/:id', protect, authorize('teacher'), updateCourse);

router.delete('/:id', protect, authorize('teacher'), deleteCourse);


module.exports = router;