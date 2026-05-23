const Course = require("../models/Course");
const Registration = require("../models/courseRegistration");
const Payment = require("../models/payment");

exports.registerCourses = async (req, res) => {
  try {
    const { courseIds, semester, sessionId } = req.body;

    let studentId;

    if (req.user.role === 'student') {
      studentId = req.user._id; // Enforce token identity over body inputs
    }

    const payment = await Payment.findOne({
      student: studentId,
      session: sessionId,
      verified: true,
    });

    if (!payment) {
      return res.status(403).json({
        success: false,
        message: "You cannot register courses without verified payment. Please complete your payment first.",
      });
    }

    const courses = await Course.find({ _id: { $in: courseIds } });

    const totalUnits = courses.reduce((sum, course) => {
      return sum + course.units;
    }, 0);


    if (totalUnits > 24) {
      return res.status(400).json({
        success: false,
        message: "You cannot register more than 24 units",
        totalUnits,
      });
    }


    const registration = await Registration.create({
      student: studentId,
      session: sessionId,
      courses: courseIds,
      totalUnits,
      semester,
    });

    await Course.updateMany(
      { _id: { $in: courseIds } },
      { $push: { enrolledStudents: studentId } }
    );

    res.status(201).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('student')
      .populate('courses')
      .populate('session');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('student')
      .populate('courses')
      .populate('session');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    // Add this check after finding the registration record:
    if (req.user.role === 'student' && registration.student._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied to this registration profile' });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRegistration = async (req, res) => {
  try {
    const { courseIds, semester } = req.body;
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }
    const payment = await Payment.findOne({
      student: registration.student,
      session: registration.session,
      verified: true,
    });

    if (!payment) {
      return res.status(403).json({
        success: false,
        message: 'Your payment verification has expired. Cannot update registration.',
      });
    }

    if (courseIds) {
      const courses = await Course.find({ _id: { $in: courseIds } });

      const totalUnits = courses.reduce((sum, course) => {
        return sum + course.units;
      }, 0);

      if (totalUnits > 24) {
        return res.status(400).json({
          success: false,
          message: 'You cannot register more than 24 units',
          totalUnits,
        });
      }

      registration.courses = courseIds;
      registration.totalUnits = totalUnits;
    }

    if (semester) {
      registration.semester = semester;
    }

    const updatedRegistration = await registration.save();

    res.status(200).json({
      success: true,
      data: updatedRegistration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};