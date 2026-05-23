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
  body('department').trim().notEmpty().withMessage('Department ID is required'),
  body('semester').isIn(['first', 'second']).withMessage('Semester must be first or second'),
  body('units').isInt({ min: 1, max: 6 }).withMessage('Units must be between 1 and 6'),
  body('level').notEmpty().withMessage('Level is required'),
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

const validateDepartment = [
  body('name').trim().notEmpty().withMessage('Department name is required'),
  body('code').trim().notEmpty().withMessage('Department code is required'),
  body('faculty').trim().notEmpty().withMessage('Faculty ID is required'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  handleValidationErrors,
];

const validateFaculty = [
  body('name').trim().notEmpty().withMessage('Faculty name is required'),
  body('code').trim().notEmpty().withMessage('Faculty code is required'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  handleValidationErrors,
];

const validateStudent = [
  body('department').trim().notEmpty().withMessage('Department ID is required'),
  body('enrollmentYear').isInt().withMessage('Enrollment year must be a valid year'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  handleValidationErrors,
];

const validateCourseRegistration = [
  body('courseIds')
    .isArray({ min: 1 })
    .withMessage('courseIds must be an array containing at least one course ID'),
  body('courseIds.*')
    .isMongoId()
    .withMessage('Each course ID within the array must be a valid MongoDB ObjectId'),
  body('semester')
    .isIn(['First', 'Second', 'first', 'second'])
    .withMessage('Semester must be either First or Second'),
  body('sessionId')
    .isMongoId()
    .withMessage('Please provide a valid session ID'),
  handleValidationErrors,
];

const validateUpdateCourseRegistration = [
  body('courseIds')
    .optional()
    .isArray()
    .withMessage('courseIds must be structured as a valid array'),
  body('courseIds.*')
    .optional()
    .isMongoId()
    .withMessage('Each course ID within the array must be a valid MongoDB ObjectId'),
  body('semester')
    .optional()
    .isIn(['First', 'Second', 'first', 'second'])
    .withMessage('Semester must be either First or Second'),
  handleValidationErrors,
];

const validateSession = [
  body('academicYear')
    .trim()
    .notEmpty()
    .withMessage('Academic year is required (e.g., 2025/2026)'),
  body('startDate')
    .notEmpty()
    .isISO8601()
    .withMessage('Start date is required and must be a valid date'),
  body('endDate')
    .notEmpty()
    .isISO8601()
    .withMessage('End date is required and must be a valid date'),
  body('isCurrent')
    .optional()
    .isBoolean()
    .withMessage('isCurrent must be a boolean value'),
  handleValidationErrors,
];

const validateUploadResult = [
  body('studentID')
    .isMongoId()
    .withMessage('studentID must be a valid MongoDB ObjectId reference to a Student'),
  body('course')
    .isMongoId()
    .withMessage('course must be a valid MongoDB ObjectId reference to a Course'),
  body('session')
    .isMongoId()
    .withMessage('session must be a valid MongoDB ObjectId reference to a Session'),
  body('level')
    .isIn(['100', '200', '300', '400', '500', '600', 'Spill-Over'])
    .withMessage('Invalid academic level state selection'),
  body('semester')
    .isIn(['first', 'second'])
    .withMessage('Semester parameter must be either first or second'),
  body('score')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Score must be a valid numeric index between 0 and 100'),
  handleValidationErrors,
];

const validateUpdateResultScore = [
  body('score')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Score must be a valid numeric index between 0 and 100'),
  handleValidationErrors,
];

const validateInitiatePayment = [
  body('session')
    .isMongoId()
    .withMessage('session must be a valid MongoDB ObjectId reference'),
  body('level')
    .notEmpty()
    .withMessage('Academic level tracking string is required'),
  body('amount')
    .isNumeric()
    .withMessage('Payment amount must be a numeric value'),
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
  validateDepartment,
  validateFaculty,
  validateStudent,
  validateCourseRegistration,
  validateUpdateCourseRegistration,
  validateSession,
  validateUploadResult,
  validateUpdateResultScore,
  validateInitiatePayment
};
