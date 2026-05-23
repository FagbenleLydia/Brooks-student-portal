const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // Format: "2023/2024"
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Session', sessionSchema);
