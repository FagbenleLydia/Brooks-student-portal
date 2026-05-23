const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const{protect,authorize} = require('../middlewares/auth.middleware');
const { validateUploadResult, validateUpdateResultScore } = require('../middlewares/validate.middleware');

router.post('/uploadresult',protect,authorize('teacher'), validateUploadResult, resultController.postResult);
router.get('/getresult',protect,authorize('student','admin'),resultController.getStudentResult);
router.get('/getcourseresult',protect,authorize('teacher','admin'), resultController.getCourseResults);
router.put('/updateresult/:id',protect, authorize('teacher'), validateUpdateResultScore, resultController.updateResult);
router.get('/adminsearch', protect, authorize('admin'), resultController.getAdminSearch)

module.exports = router;