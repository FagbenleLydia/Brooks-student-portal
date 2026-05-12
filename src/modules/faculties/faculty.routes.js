const express = require("express");
const router = express.Router();
const { validateFaculty } = require("../../middlewares/validate.middleware");

const {
  createFaculty,
  getFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} = require("./faculty.controller");

router.post("/", validateFaculty, createFaculty);
router.get("/", getFaculties);
router.get("/:id", getFacultyById);
router.put("/:id", validateFaculty, updateFaculty);
router.delete("/:id", deleteFaculty);

module.exports = router;
