const express = require("express");
const db = require("../models");
const Designation = db.designation;
const Op = db.Sequelize.Op;

const {
  getAllDesignation,
  addDesignation,
  getSingleDesignation,
  updateSingleDesignation,
  deleteSingleDesignation,
} = require("../controllers/designation.controller");

const router = express.Router();

router.route("/").get(getAllDesignation);

router.route("/").post(addDesignation);

router.route("/:id").get(getSingleDesignation);

router.route("/:id").put(updateSingleDesignation);
router.route("/:id").delete(deleteSingleDesignation);

module.exports = router;
