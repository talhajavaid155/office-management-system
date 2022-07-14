const express = require("express");
const db = require("../models");
const Project = db.projects;
const Op = db.Sequelize.Op;

const {
  getAllProjects,
  addProject,
  getSingleProject,
  updateSingleProject,
  deleteSingleProject,
  upload,
} = require("../controllers/project.controller");

const router = express.Router();

router.route("/").get(getAllProjects);

router.route("/").post(upload.single("projectImage"), addProject);

router.route("/:id").get(getSingleProject);

router.route("/:id").put(updateSingleProject);
router.route("/:id").delete(deleteSingleProject);

module.exports = router;
