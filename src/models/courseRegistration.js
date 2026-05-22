const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    totalUnits: {
      type: Number,
      default: 0,
    },

    semester: {
      type: String,
      enum: ["first", "second"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);