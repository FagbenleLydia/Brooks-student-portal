const express = require('express');
const router = express.Router();
const {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcement.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateAnnouncement } = require('../middlewares/validate.middleware');

// All routes require authentication
router.use(protect);

router.get('/', getAnnouncements);
router.post('/', authorize('admin', 'teacher'), validateAnnouncement, createAnnouncement);
router.delete('/:id', authorize('admin'), deleteAnnouncement);

module.exports = router;
