const db = require("../models");
const Department = db.department;
const asyncHandler = require("express-async-handler");

// Post Department

const addDepartment = asyncHandler(async (req, res) => {
  // Validate Request
  if (!req.body.departmentName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const department = {
    departmentName: req.body.departmentName,
  };
  // Save Dept in the database
  Department.create(department)
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
const getAllDepartments = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json({ departments });
  } catch (error) {
    console.log("error", error);
    res.status(500);
    throw error;
  }
});

// Find Department with an id
const getSingleDepartment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Department.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: " Cannot Find Department with id = " + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: " Error Retrieving Department with id = " + id,
      });
      throw err;
    });
});

// Update Single Department
const updateSingleDepartment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Department.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Department was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Department with id=" + id,
      });
      throw err;
    });
});

// Delete Dept
const deleteSingleDepartment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Department.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Department was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Department with id=${id}. Maybe Department was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Department with id=" + id,
      });
    });
});

module.exports = {
  getAllDepartments,
  addDepartment,
  getSingleDepartment,
  updateSingleDepartment,
  deleteSingleDepartment,
};
