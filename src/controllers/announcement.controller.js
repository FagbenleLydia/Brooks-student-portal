const Announcement = require('../models/Announcement');

// Roles that can see which audience buckets
const audienceMap = {
  student: ['students', 'all'],
  teacher: ['teachers', 'all'],
  parent:  ['students', 'all'],
  admin:   ['students', 'teachers', 'all'],
};

exports.getAnnouncements = async (req, res) => {
  try {
    const allowed = audienceMap[req.user.role] || ['all'];

    const announcements = await Announcement.find({
      isPublished: true,
      targetAudience: { $in: allowed },
    })
      .populate('postedBy', 'firstName lastName role')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch announcements' });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, targetAudience } = req.body;

    const announcement = await Announcement.create({
      title,
      content,
      targetAudience,
      postedBy: req.user._id,
    });

    await announcement.populate('postedBy', 'firstName lastName role');

    return res.status(201).json({
      success: true,
      message: 'Announcement posted successfully',
      data: announcement,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Failed to post announcement' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    await announcement.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Failed to delete announcement' });
  }
};
