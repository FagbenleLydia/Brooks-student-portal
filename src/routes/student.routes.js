const express = require('express');

const router = express.Router();

const { createStudentProfile, getStudentProfile } = require('../controllers/student.controller');

const { protect } = require('../middlewares/auth.middleware');



// ================= CREATE PROFILE =================

router.post('/profile', protect, createStudentProfile);
router.get('/profile/:id', protect, getStudentProfile);



module.exports = router;