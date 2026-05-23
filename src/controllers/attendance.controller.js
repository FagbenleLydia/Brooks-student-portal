const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  try {
    const { student, course, status, date } = req.body;

    const attendance = await Attendance.create({ student, course, status, date });

    return res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    // Duplicate key = already marked for that student/course/day
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Attendance already marked for this student on this date' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ course: req.params.id })
      .populate('student', 'firstName lastName authUserId');

    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.params.id })
      .populate('course', 'title courseCode');

    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    return res.status(200).json({ success: true, message: 'Attendance record deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
