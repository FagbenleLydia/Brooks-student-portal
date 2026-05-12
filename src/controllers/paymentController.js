const Payment = require('../models/payment');

const Student = require('../models/student');

const {

  generateRRR,

  verifyRemitaPayment,

} = require('../services/remitaService');



// ================= INITIATE PAYMENT =================

const initiatePayment = async (req, res) => {

  try {

    const {

      session,

      level,

      amount,

    } = req.body;



    // Find logged-in student

    const student = await Student.findOne({

      user: req.user._id,

    }).populate('user');



    if (!student) {

      return res.status(404).json({

        success: false,

        message: 'Student not found',

      });

    }



    // Generate RRR

    const rrr = await generateRRR();



    // Create payment

    const payment = await Payment.create({

      student: student._id,

      session,

      level,

      amount,

      rrr,

      status: 'pending',

    });



    res.status(201).json({

      success: true,

      message: 'Payment initiated successfully',

      payment,

    });



  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ================= VERIFY PAYMENT =================

const verifyPayment = async (req, res) => {

  try {

    const payment = await Payment.findById(req.params.id);



    if (!payment) {

      return res.status(404).json({

        success: false,

        message: 'Payment not found',

      });

    }



    // Simulate Remita verification

    const verification = await verifyRemitaPayment(payment.rrr);



    if (verification.status === 'successful') {

      payment.status = 'successful';

      payment.verified = true;

      await payment.save();

    }



    res.status(200).json({

      success: true,

      message: 'Payment verified successfully',

      payment,

    });



  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ================= GET PAYMENT STATUS =================

const getPaymentStatus = async (req, res) => {

  try {

    const student = await Student.findOne({

      user: req.user._id,

    });



    if (!student) {

      return res.status(404).json({

        success: false,

        message: 'Student not found',

      });

    }



    const payment = await Payment.findOne({

      student: student._id,

      status: 'successful',

    });



    if (!payment) {

      return res.status(200).json({

        success: true,

        paid: false,

        message: 'Student has not paid school fees',

      });

    }



    res.status(200).json({

      success: true,

      paid: true,

      message: 'Student has paid school fees',

      payment,

    });



  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ================= EXPORTS =================

module.exports = {

  initiatePayment,

  verifyPayment,

  getPaymentStatus,

};