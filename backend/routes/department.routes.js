const express = require("express");
const db = require("../models");
const Department = db.department;
const Op = db.Sequelize.Op;

const {
  getAllDepartments,
  addDepartment,
  getSingleDepartment,
  updateSingleDepartment,
  deleteSingleDepartment,
} = require("../controllers/department.controller");

const router = express.Router();

router.route("/").get(getAllDepartments);

router.route("/").post(addDepartment);

router.route("/:id").get(getSingleDepartment);

router.route("/:id").put(updateSingleDepartment);
router.route("/:id").delete(deleteSingleDepartment);

module.exports = router;
