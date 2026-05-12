const express = require("express");
const router = express.Router();
const { validateStudent } = require("../../middlewares/validate.middleware");

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("./student.controller");

router.post("/", validateStudent, createStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", validateStudent, updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
