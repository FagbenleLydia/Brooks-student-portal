const express = require('express');
const router = express.Router();
const { validateFaculty } = require("../../middlewares/validate.middleware");

const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require('./course.controller');


router.post('/', createCourse);

router.get('/', getCourses);

router.get('/:id', getCourse);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse);


module.exports = router;