const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/uploadresult', resultController.postResult);

module.exports = router;