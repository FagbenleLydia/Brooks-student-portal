const express = require('express');
const router = express.Router();
const { validateFaculty } = require("../../middlewares/validate.middleware");

const {
  createLevel,
  getLevels,
  getLevel,
  updateLevel,
  deleteLevel,
} = require('./level.controller');


router.post('/', createLevel);

router.get('/', getLevels);

router.get('/:id', getLevel);

router.put('/:id', updateLevel);

router.delete('/:id', deleteLevel);

module.exports = router;