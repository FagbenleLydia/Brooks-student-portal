const mongoose = require('mongoose');

function calcGradePoint(total) {
  if (total >= 70) return 5.0;
  if (total >= 60) return 4.0;
  if (total >= 50) return 3.0;
  if (total >= 45) return 2.0;
  if (total >= 40) return 1.0;
  return 0.0;
}

const gradeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    scores: {
      assignment: { type: Number, required: true, min: 0, max: 30 },
      midterm:    { type: Number, required: true, min: 0, max: 30 },
      exam:       { type: Number, required: true, min: 0, max: 40 },
    },
    totalScore: { type: Number },
    gradePoint: { type: Number },
    semester:     { type: String, enum: ['first', 'second'], required: true },
    academicYear: { type: String, required: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);

gradeSchema.pre('save', function (next) {
  this.totalScore = this.scores.assignment + this.scores.midterm + this.scores.exam;
  this.gradePoint = calcGradePoint(this.totalScore);
  next();
});

module.exports = mongoose.model('Grade', gradeSchema);
