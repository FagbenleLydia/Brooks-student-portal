const Student = require('../models/student');



// ================= CREATE STUDENT PROFILE =================

exports.createStudentProfile = async (req, res) => {

  try {

    const {

      studentId,

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

      studentId,

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

};