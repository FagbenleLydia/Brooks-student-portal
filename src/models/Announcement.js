const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    targetAudience: {
      type: String,
      enum: ['students', 'teachers', 'all'],
      default: 'all',
    },
    postedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Announcement', announcementSchema);
