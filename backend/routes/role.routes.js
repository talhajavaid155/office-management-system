const express = require("express");
const db = require("../models");
const Role = db.role;
const Op = db.Sequelize.Op;

const {
  getAllRoles,
  addRole,
  getSingleRole,
  updateSingleRole,
  deleteSingleRole,
} = require("../controllers/role.controller");

const router = express.Router();

router.route("/").get(getAllRoles);

router.route("/").post(addRole);

router.route("/:id").get(getSingleRole);

router.route("/:id").put(updateSingleRole);
router.route("/:id").delete(deleteSingleRole);

module.exports = router;
