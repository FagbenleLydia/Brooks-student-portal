const Grade = require('../models/Grade');
const Course = require('../models/Course');

exports.createGrade = async (req, res) => {
  try {
    const { student, course, scores, semester, academicYear } = req.body;

    const existingGrade = await Grade.findOne({ student, course, semester, academicYear });
    if (existingGrade) {
      return res.status(400).json({ success: false, message: 'Grade already recorded for this student in this course' });
    }

    const grade = await Grade.create({ student, course, scores, semester, academicYear });

    return res.status(201).json({ success: true, data: grade });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentGrades = async (req, res) => {
  try {
    const studentId = req.params.id;

    const grades = await Grade.find({ student: studentId })
      .populate('course', 'title courseCode units');

    if (grades.length === 0) {
      return res.status(404).json({ success: false, message: 'No grades found for this student' });
    }

    // Calculate GPA: sum(gradePoint * units) / totalUnits
    let totalWeightedPoints = 0;
    let totalUnits = 0;

    grades.forEach((g) => {
      const units = g.course?.units || 0;
      totalWeightedPoints += g.gradePoint * units;
      totalUnits += units;
    });

    const gpa = totalUnits > 0 ? (totalWeightedPoints / totalUnits).toFixed(2) : 0;

    return res.status(200).json({ success: true, gpa: Number(gpa), data: grades });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      { scores: req.body.scores },
      { new: true, runValidators: true }
    );

    if (!grade) {
      return res.status(404).json({ success: false, message: 'Grade not found' });
    }

    return res.status(200).json({ success: true, data: grade });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);

    if (!grade) {
      return res.status(404).json({ success: false, message: 'Grade not found' });
    }

    return res.status(200).json({ success: true, message: 'Grade deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
