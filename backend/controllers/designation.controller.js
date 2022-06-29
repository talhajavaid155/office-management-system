const db = require("../models");
const Designation = db.designation;
const asyncHandler = require("express-async-handler");

// Post Designation

const addDesignation = asyncHandler(async (req, res) => {
  // Validate Request
  if (!req.body.designationName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const designation = {
    designationName: req.body.designationName,
  };
  // Save Designation in the database
  Designation.create(designation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
});

// Get All Designation
const getAllDesignation = asyncHandler(async (req, res) => {
  try {
    const designation = await Designation.findAll();
    res.status(200).json({ designation });
  } catch (error) {
    console.log("error", error);
    res.status(500);
    throw error;
  }
});

// Find Designation with an id
const getSingleDesignation = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Designation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: " Cannot Find Designation with id = " + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: " Error Retrieving Designation with id = " + id,
      });
      throw err;
    });
});

// Update Single Designation
const updateSingleDesignation = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Designation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Designation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Designation with id=${id}. Maybe Designation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Designation with id=" + id,
      });
      throw err;
    });
});

// Delete Designation
const deleteSingleDesignation = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Designation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Designation was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Designation with id=${id}. Maybe Designation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Designation with id=" + id,
      });
    });
});

module.exports = {
  getAllDesignation,
  addDesignation,
  getSingleDesignation,
  updateSingleDesignation,
  deleteSingleDesignation,
};
