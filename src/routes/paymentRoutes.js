const express = require('express');

const router = express.Router();

const {

  initiatePayment,

  verifyPayment,

  getPaymentStatus,

} = require('../controllers/paymentController');



// Import existing auth middleware

const { protect } = require('../middlewares/auth.middleware');


// ================= PAYMENT ROUTES =================

// Initiate payment

router.post('/initiate', protect, initiatePayment);



// Verify payment

router.put('/verify/:id', protect, verifyPayment);



// Get logged-in student payment status

router.get('/status', protect, getPaymentStatus);



module.exports = router;