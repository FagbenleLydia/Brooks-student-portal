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
const { protect, authorize } = require('../../middlewares/auth.middleware');


router.post('/', protect, authorize('admin'), createLevel);

router.get('/', protect, getLevels);

router.get('/:id', protect, getLevel);

router.put('/:id', protect, authorize('admin'), updateLevel);

router.delete('/:id', protect, authorize('admin'), deleteLevel);

module.exports = router;