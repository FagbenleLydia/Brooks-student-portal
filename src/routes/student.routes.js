const express = require('express');

const router = express.Router();

const {

  createStudentProfile,

} = require('../controllers/student.controller');

const {

  protect,

} = require('../middlewares/auth.middleware');



// ================= CREATE PROFILE =================

router.post('/profile', protect, createStudentProfile);



module.exports = router;