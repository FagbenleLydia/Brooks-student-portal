const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true, trim: true,},
    isActive: {type: Boolean, default: true,},
  },
  {timestamps: true, versionKey: false,}
);

module.exports = mongoose.model('Level', levelSchema);