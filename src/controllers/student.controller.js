const Student = require('../models/student');



// ================= CREATE STUDENT PROFILE =================

exports.createStudentProfile = async (req, res) => {

  try {

    const {

      department,

      enrollmentYear,

    } = req.body;



    // Check if profile already exists

    const existingStudent = await Student.findOne({

      user: req.user._id,

    });



    if (existingStudent) {

      return res.status(400).json({

        success: false,

        message: 'Student profile already exists',

      });

    }



    // Create profile

    const student = await Student.create({

      user: req.user._id,

      studentId: req.user.authUserId,

      department,

      enrollmentYear,

    });



    res.status(201).json({

      success: true,

      message: 'Student profile created successfully',

      student,

    });



  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });
  }

}

// ================= GET SINGLE STUDENT (ADMIN ONLY) =================
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', 'firstName lastName email authUserId')
      .populate('department', 'name code');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    res.status(200).json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= UPDATE STUDENT PROFILE (ADMIN ONLY) =================
exports.updateStudentProfile = async (req, res) => {
  try {
    const { department, enrollmentYear, isActive } = req.body;

    // Construct clean tracking update payload
    const updateData = {};
    if (department !== undefined) updateData.department = department;
    if (enrollmentYear !== undefined) updateData.enrollmentYear = enrollmentYear;
    if (isActive !== undefined) updateData.isActive = isActive;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student profile updated successfully',
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= DELETE STUDENT PROFILE (ADMIN ONLY) =================
exports.deleteStudentProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student profile successfully removed from system storage mapping'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}