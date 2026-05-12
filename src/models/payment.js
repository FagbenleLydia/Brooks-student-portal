const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },

    session: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    rrr: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ['pending', 'successful', 'failed'],
      default: 'pending',
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Payment', paymentSchema);