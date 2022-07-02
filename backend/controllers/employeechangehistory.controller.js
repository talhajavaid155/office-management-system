const db = require("../models");
const EmployeeChangeHistory = db.employeeChangeHistory;
const asyncHandler = require("express-async-handler");

// Post History

const addHistory = asyncHandler(async (req, res) => {
  // Validate Request
  if (!req.body.Resignation) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const employeeChangeHistory = {
    Resignation: req.body.Resignation,
  };
  // Save History in the database
  EmployeeChangeHistory.create(employeeChangeHistory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
});

// Get All History
const getAllHistory = asyncHandler(async (req, res) => {
  try {
    const employeeChangeHistory = await EmployeeChangeHistory.findAll();
    res.status(200).json({ employeeChangeHistory });
  } catch (error) {
    console.log("error", error);
    res.status(500);
    throw error;
  }
});

// Find History with an id
const getSingleEmployeeHistory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  EmployeeChangeHistory.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: " Cannot Find Employee History with id = " + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: " Error Retrieving Employee History with id = " + id,
      });
      throw err;
    });
});

// Update Single History
const updateSingleEmployeeHistory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  EmployeeChangeHistory.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee History was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Employee History with id=${id}. Maybe Employee History was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Employee History with id=" + id,
      });
      throw err;
    });
});

// Delete History
const deleteSingleEmployeeHistory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  EmployeeChangeHistory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee History was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Employee History with id=${id}. Maybe Employee History was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Employee History with id=" + id,
      });
    });
});

module.exports = {
  addHistory,
  getAllHistory,
  getSingleEmployeeHistory,
  updateSingleEmployeeHistory,
  deleteSingleEmployeeHistory,
};
