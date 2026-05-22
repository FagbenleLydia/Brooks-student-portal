const express = require('express');
const router = express.Router();

const {
  registerCourses,
  getRegistrations,
  getRegistration,
  updateRegistration,
  deleteRegistration,
} = require('./courseRegistration.controller');

router.post('/', registerCourses);

router.get('/', getRegistrations);

router.get('/:id', getRegistration);

router.put('/:id', updateRegistration);

router.delete('/:id', deleteRegistration);

module.exports = router;
