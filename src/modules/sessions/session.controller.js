const Session = require('../../models/Session');

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);

    res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors || undefined,
    });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCurrentSession = async (req, res) => {
  try {
    const session = await Session.findOne({ isCurrent: true });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'No current session set',
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors || undefined,
    });
  }
};

exports.setCurrentSession = async (req, res) => {
  try {
    // Unset all current sessions
    await Session.updateMany({}, { isCurrent: false });

    // Set the specified session as current
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { isCurrent: true },
      { new: true, runValidators: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Session set as current',
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Session deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
