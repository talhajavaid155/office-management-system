const db = require("../models");
const Role = db.role;
const asyncHandler = require("express-async-handler");
const { user } = require("../models");

// Post Role

const addRole = asyncHandler(async (req, res) => {
  // Validate Request
  if (!req.body.roleName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const role = {
    roleName: req.body.roleName,
  };
  // Save Dept in the database
  Role.create(role)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
});

// Get All Departments
const getAllRoles = asyncHandler(async (req, res) => {
  try {
    const roles = await Role.findAll({ inclue: ["user"] });
    res.status(200).json({ roles });
  } catch (error) {
    console.log("error", error);
    res.status(500);
    throw error;
  }
});

// Find Department with an id
const getSingleRole = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Role.findByPk(id, {
    include: ["user"],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: " Cannot Find Role with id = " + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: " Error Retrieving Role with id = " + id,
      });
      throw err;
    });
});

// Update Single Department
const updateSingleRole = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Role.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + id,
      });
      throw err;
    });
});

// Delete Dept
const deleteSingleRole = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Role.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Role with id=" + id,
      });
    });
});

module.exports = {
  getAllRoles,
  addRole,
  getSingleRole,
  updateSingleRole,
  deleteSingleRole,
};
