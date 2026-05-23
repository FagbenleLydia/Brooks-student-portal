const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  code: String,
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Department", departmentSchema);