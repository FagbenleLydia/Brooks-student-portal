const express = require('express');
const router = express.Router();

const {
  registerCourses,
  getRegistrations,
  getRegistration,
  updateRegistration,
  deleteRegistration,
} = require('../controllers/courseRegistration.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateCourseRegistration, validateUpdateCourseRegistration } = require('../middlewares/validate.middleware');

router.post('/', authorize('student', 'admin'), protect, validateCourseRegistration, registerCourses);

router.get('/', protect, authorize('admin', 'teacher'), getRegistrations);

router.get('/:id', protect, authorize('admin', 'teacher', 'student'), getRegistration);

router.put('/:id', authorize('student', 'admin'), protect, validateUpdateCourseRegistration, updateRegistration);

router.delete('/:id', protect, authorize('admin'), deleteRegistration);

module.exports = router;
