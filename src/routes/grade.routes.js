const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateGrade } = require('../middlewares/validate.middleware');
const { createGrade, getStudentGrades, updateGrade, deleteGrade } = require('../controllers/grade.controller');

router.post('/', protect, authorize('teacher', 'admin'), validateGrade, createGrade);
router.get('/student/:id', protect, getStudentGrades);
router.put('/:id', protect, authorize('teacher', 'admin'), updateGrade);
router.delete('/:id', protect, authorize('admin'), deleteGrade);

module.exports = router;
