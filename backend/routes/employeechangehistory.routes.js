const express = require("express");
const db = require("../models");
const EmployeeChangeHistory = db.employeechangehistory;
const Op = db.Sequelize.Op;

const {
  addHistory,
  getAllHistory,
  getSingleEmployeeHistory,
  updateSingleEmployeeHistory,
  deleteSingleEmployeeHistory,
} = require("../controllers/employeechangehistory.controller");

const router = express.Router();

router.route("/").get(getAllHistory);

router.route("/").post(addHistory);

router.route("/:id").get(getSingleEmployeeHistory);

router.route("/:id").put(updateSingleEmployeeHistory);
router.route("/:id").delete(deleteSingleEmployeeHistory);

module.exports = router;
