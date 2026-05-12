const express = require("express");
const router = express.Router();
const { validateCourse } = require("../../middlewares/validate.middleware");

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("./course.controller");

router.post("/", validateCourse, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", validateCourse, updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
