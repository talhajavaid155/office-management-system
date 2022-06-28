const db = require("../models");
const Employee = db.employee;
const asyncHandler = require("express-async-handler");

// Get All Employees
const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json({ employees });
  } catch (error) {
    console.log("error ", error);
    res.status(500);
    throw error;
  }
});

// Post Employee

const addEmployee = asyncHandler(async (req, res) => {
  // Validate Request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Gender: req.body.Gender,
    Address: req.body.Address,
    DOB: req.body.DOB,
  };
  // Save Employee in the database
  Employee.create(employee)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
});

// Find Employee with an id
const getSingleEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: " Cannot Find Employee with id = " + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: " Error Retrieving Employee with id = " + id,
      });
    });
});

// Update Single Employee
const updateSingleEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Employee.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id,
      });
    });
});

// Delete Employee
const deleteSingleEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Employee.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Employee with id=" + id,
      });
    });
});
module.exports = {
  getAllEmployees,
  addEmployee,
  getSingleEmployee,
  updateSingleEmployee,
  deleteSingleEmployee,
};
