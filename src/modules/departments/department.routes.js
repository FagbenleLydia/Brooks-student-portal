const express = require("express");
const router = express.Router();
const { validateDepartment } = require("../../middlewares/validate.middleware");

const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("./department.controller");


router.post("/", validateDepartment, createDepartment);

router.get("/", getDepartments);

router.get("/:id", getDepartment);

router.put("/:id", validateDepartment, updateDepartment);

router.delete("/:id", deleteDepartment);

module.exports = router;