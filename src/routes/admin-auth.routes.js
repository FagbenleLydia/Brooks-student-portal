const express = require('express');
const router = express.Router();

const { bootstrap, createUser } = require('../controllers/admin-auth.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateRegister, validateLogin } = require('../middlewares/validate.middleware');

router.post('/admin-bootstrap', bootstrap);
router.post('/create-user', protect, authorize('admin'), validateRegister, createUser);

module.exports = router;
