const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title:      { type: String, required: true, trim: true },
    courseCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    semester: {
      type: String,
      enum: ['first', 'second'],
      required: true,
    },
    academicYear: { type: String, required: true, trim: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Course', courseSchema);
