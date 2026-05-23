const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Counter = require('./Counter');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true, select: false, minlength: 6 },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student', 'parent'],
      default: 'student',
    },
    authUserId: { type: String, unique: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);

//Password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//ID generation
userSchema.pre('save', async function (next) {
  if(!this.isNew) return next();

  try {
    const newCount = await Counter.findOneAndUpdate(
      { id: `${this.role}Id` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const paddedId = newCount.seq.toString().padStart(3, '0');
    const prefixes = {
      admin: 'ADM',
      teacher: 'TCH',
      student: 'STU',
      parent: 'PRT'
    }
    const prefix = prefixes[this.role];

    this.authUserId = `${prefix}-${paddedId}`

    next();
  } catch(error) {
    next(error);
  }
});

//Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
