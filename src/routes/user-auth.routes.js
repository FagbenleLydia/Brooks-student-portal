const express = require('express');
const router = express.Router();

const { register, login, profile } = require('../controllers/user-auth.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateRegister, validateLogin } = require('../middlewares/validate.middleware');

router.post('/register', validateRegister, register);
router.post('/sign-in', validateLogin, login);
router.get('/me', protect, authorize('admin', 'teacher', 'student', 'parent'), profile);

module.exports = router;
