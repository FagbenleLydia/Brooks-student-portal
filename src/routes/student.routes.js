const express = require('express');
const router = express.Router();
const {
  createStudentProfile,
  getStudentById,
  updateStudentProfile,
  deleteStudentProfile
} = require('../controllers/student.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateStudent } = require('../middlewares/validate.middleware');

// ================= STUDENT SPECIFIC ACTIONS =================
router.post('/profile', protect, authorize('student'), validateStudent, createStudentProfile);

// ================= ADMINISTRATIVE CONTROL ACTIONS =================
router.route('/:id')
  .get(protect, authorize('admin'), getStudentById)
  .put(protect, authorize('admin'), validateStudent, updateStudentProfile)
  .delete(protect, authorize('admin'), deleteStudentProfile);

module.exports = router;