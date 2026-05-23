const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateAttendance } = require('../middlewares/validate.middleware');
const { markAttendance, getCourseAttendance, getStudentAttendance, deleteAttendance } = require('../controllers/attendance.controller');

router.post('/', protect, authorize('teacher', 'admin'), validateAttendance, markAttendance);
router.get('/course/:id', protect, authorize('teacher', 'admin'), getCourseAttendance);
router.get('/student/:id', protect, getStudentAttendance);
router.delete('/:id', protect, authorize('admin'), deleteAttendance);

module.exports = router;
