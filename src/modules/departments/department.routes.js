const express = require("express");
const router = express.Router();
const { validateDepartment } = require("../../middlewares/validate.middleware");

const {
  createDepartment,
} = require("./department.controller");

router.post("/", validateDepartment, createDepartment);

module.exports = router;