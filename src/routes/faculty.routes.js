const express = require("express");
const router = express.Router();
const { validateFaculty } = require("../middlewares/validate.middleware");

const {
  createFaculty,
  getFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/faculty.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");

router.post("/", protect, authorize('admin'), validateFaculty, createFaculty);
router.get("/", protect, getFaculties);
router.get("/:id", protect, getFacultyById);
router.put("/:id", protect, authorize('admin'), validateFaculty, updateFaculty);
router.delete("/:id", protect, authorize('admin'), deleteFaculty);

module.exports = router;
