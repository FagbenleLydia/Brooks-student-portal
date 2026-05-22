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
} = require('./session.controller');

router.post('/', createSession);

router.get('/', getSessions);

router.get('/current', getCurrentSession);

router.get('/:id', getSession);

router.put('/:id', updateSession);

router.patch('/:id/set-current', setCurrentSession);

router.delete('/:id', deleteSession);

module.exports = router;
