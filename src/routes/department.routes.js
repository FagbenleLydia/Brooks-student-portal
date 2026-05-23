const express = require("express");
const router = express.Router();
const { validateDepartment } = require("../middlewares/validate.middleware");

const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");


router.post("/", protect, authorize('admin'), validateDepartment, createDepartment);

router.get("/", protect, getDepartments);

router.get("/:id", protect, getDepartment);

router.put("/:id", protect, authorize('admin'), validateDepartment, updateDepartment);

router.delete("/:id", protect, authorize('admin'), deleteDepartment);

module.exports = router;