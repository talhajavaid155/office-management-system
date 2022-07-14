const db = require("../models");
const Project = db.project;
const asyncHandler = require("express-async-handler");
const { user } = require("../models");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //accept images upto 5MB
  },
  fileFilter: fileFilter,
}).single("projectImage");

// Get All Projects
const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        "users",
        {
          model: user,
          as: "users",
          // attributes: ["id", "firstName"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json({ projects });
  } catch (error) {
    console.log("error ", error);
    res.status(500);
    throw error;
  }
});

// Post Project

const addProject = asyncHandler(async (req, res) => {
  console.log(req.file);
  // Validate Request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const project = {
    Title: req.body.title,
    projectImage: req.file.path,
  };
  // Save Employee in the database
  Project.create(project)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project.",
      });
    });
});

// Find Project with an id
const getSingleProject = asyncHandler(async (req, res) => {
  const id = req.params.id;

  Project.findByPk(id, {
    include: [
      "users",
      {
        model: user,
        as: "users",
        attributes: ["id", "firstName"],
        through: { attributes: [] },
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: " Cannot Find Project with id = " + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: " Error Retrieving Project with id = " + id,
      });
    });
});

// Update Single Project
const updateSingleProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Project.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Project with id=" + id,
      });
    });
});

// Delete Project
const deleteSingleProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Project.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Project with id=" + id,
      });
    });
});

module.exports = {
  getAllProjects,
  addProject,
  getSingleProject,
  updateSingleProject,
  deleteSingleProject,
  upload,
};
