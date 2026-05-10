const { validationResult, body } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const validateCreateUser = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'teacher', 'student', 'parent'])
    .withMessage('Invalid role'),
  handleValidationErrors,
];

const validateRegister = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['teacher', 'student', 'parent'])
    .withMessage('Invalid role'),
  handleValidationErrors,
];

const validateLogin = [
  body('emailOrAuthId').notEmpty().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

const validateGrade = [
  body('student').notEmpty().withMessage('Student ID is required'),
  body('course').notEmpty().withMessage('Course ID is required'),
  body('scores.assignment').isFloat({ min: 0, max: 30 }).withMessage('Assignment score must be between 0 and 30'),
  body('scores.midterm').isFloat({ min: 0, max: 30 }).withMessage('Midterm score must be between 0 and 30'),
  body('scores.exam').isFloat({ min: 0, max: 40 }).withMessage('Exam score must be between 0 and 40'),
  body('semester').isIn(['first', 'second']).withMessage('Semester must be first or second'),
  body('academicYear').notEmpty().withMessage('Academic year is required'),
  handleValidationErrors,
];

const validateAttendance = [
  body('student').notEmpty().withMessage('Student ID is required'),
  body('course').notEmpty().withMessage('Course ID is required'),
  body('status').isIn(['present', 'absent', 'late']).withMessage('Status must be present, absent, or late'),
  body('date').isISO8601().withMessage('Please provide a valid date'),
  handleValidationErrors,
];

const validateCourse = [
  body('title').trim().notEmpty().withMessage('Course title is required'),
  body('courseCode').trim().notEmpty().withMessage('Course code is required'),
  body('semester').isIn(['first', 'second']).withMessage('Semester must be first or second'),
  body('academicYear').notEmpty().withMessage('Academic year is required'),
  handleValidationErrors,
];

const validateAnnouncement = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('targetAudience')
    .optional()
    .isIn(['students', 'teachers', 'all'])
    .withMessage('Target audience must be students, teachers, or all'),
  handleValidationErrors,
];

module.exports = {
  validateCreateUser,
  validateRegister,
  validateLogin,
  validateGrade,
  validateAttendance,
  validateCourse,
  validateAnnouncement,
};
