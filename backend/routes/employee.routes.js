const express = require("express");
const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

const { validateToken } = require("../controllers/jwt");

const {
  login,
  register,
  profile,
  getAllEmployees,
  // addEmployee,
  getSingleEmployee,
  updateSingleEmployee,
  deleteSingleEmployee,
} = require("../controllers/employee.controller");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/profile").get(validateToken, profile);

router.route("/").get(getAllEmployees);

// router.route("/").post(addEmployee);

router.route("/:id").get(getSingleEmployee);

router.route("/:id").put(updateSingleEmployee);
router.route("/:id").delete(deleteSingleEmployee);

module.exports = router;
