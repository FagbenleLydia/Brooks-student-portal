const express = require('express');
const router = express.Router();

const {
  createSession,
  getSessions,
  getSession,
  getCurrentSession,
  updateSession,
  setCurrentSession,
  deleteSession,
} = require('../controllers/session.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateSession } = require('../middlewares/validate.middleware');

router.post('/', protect, authorize('admin'), validateSession, createSession);

router.get('/', protect, getSessions);

router.get('/current', protect, getCurrentSession);

router.get('/:id', protect, getSession);

router.put('/:id', protect, authorize('admin'), updateSession);

router.patch('/:id/set-current', protect, authorize('admin'), setCurrentSession);

router.delete('/:id', protect, authorize('admin'), deleteSession);

module.exports = router;
