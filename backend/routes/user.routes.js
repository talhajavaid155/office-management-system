const express = require("express");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { validateToken, admin } = require("../middleware/authMiddleware");

const {
  login,
  register,
  getUserProfile,
  getAllUsers,
  // addEmployee,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/login").post(login);
router.route("/profile").get(validateToken, getUserProfile);
router.route("/profile").put(validateToken, getUserProfile);

router.route("/register").post(register);
// router.route("/profile").get(validateToken, profile);

router.route("/").get(validateToken, admin, getAllUsers);

// router.route("/").post(addEmployee);

router.route("/:id").get(validateToken, getSingleUser);
router.route("/:id").put(validateToken, updateSingleUser);
router.route("/:id").delete(validateToken, deleteSingleUser);

module.exports = router;
