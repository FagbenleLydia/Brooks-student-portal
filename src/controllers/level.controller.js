const Level = require('../models/level');


exports.createLevel = async (req, res) => {
  try {
    const level = await Level.create(req.body);

    res.status(201).json({
      success: true,
      data: level,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getLevels = async (req, res) => {
  try {
    const levels = await Level.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: levels.length,
      data: levels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getLevel = async (req, res) => {
  try {
    const level = await Level.findById(req.params.id);

    if (!level) {
      return res.status(404).json({
        success: false,
        message: 'Level not found',
      });
    }

    res.status(200).json({
      success: true,
      data: level,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateLevel = async (req, res) => {
  try {
    const level = await Level.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!level) {
      return res.status(404).json({
        success: false,
        message: 'Level not found',
      });
    }

    res.status(200).json({
      success: true,
      data: level,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteLevel = async (req, res) => {
  try {
    const level = await Level.findByIdAndDelete(req.params.id);

    if (!level) {
      return res.status(404).json({
        success: false,
        message: 'Level not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Level deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};