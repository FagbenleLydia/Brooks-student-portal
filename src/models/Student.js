const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    studentId: { type: String, required: true, unique: true, trim: true },
    department: { type: String, required: true, trim: true },
    enrollmentYear: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Student', studentSchema);
