const db = require("../models");
const User = db.user;
const Project = db.project;
const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt"); //for hashing
const { validateToken } = require("../middleware/authMiddleware");
const { generateToken } = require("../util/generateToken");
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");
const { project } = require("../models");

const register = asyncHandler(async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json({ ...errors, validationFormType: "register" });
  }
  User.findOne({ where: { userName: req.body.userName } }).then((user) => {
    if (user) {
      return res.status(400).json({
        userName: "Username already exists",
        validationFormType: "register",
      });
    } else {
      const { firstName, lastName, Gender, Address, DOB, userName, Password } =
        req.body;
      const newUser = {
        firstName,
        lastName,
        Gender,
        Address,
        DOB,
        userName,
        Password,
      };
      /////same username errors...
      //   if (err) throw err;
      bcrypt.hash(newUser.Password, 10).then((hash) => {
        newUser.Password = hash;
        User.create(newUser)
          .then(async (data) => {
            await data.setProjects(projects);
            res.send(data);
            res.json("Employee Registerd");
          })
          .catch((err) => {
            console.log("error :", err);
          });
      });
    }
  });
});

const login = asyncHandler(async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json({ ...errors, validationFormType: "login" });
  }

  const { userName, Password } = req.body;

  // Auth User and Get Token
  // POST /employees/register
  // {
  //   where: { userName: userName },
  // include: [
  //   "department",
  //   "role",
  //   { model: project, as: "projects", through: { attributes: [] } },
  // ],
  // }
  const user = await User.findOne({
    where: { userName: userName },
    include: [
      "department",
      "role",
      { model: project, as: "projects", through: { attributes: [] } },
    ],
  });
  if (!user) {
    res.status(400).json({ error: "Username not exist" });
  }
  //dbPassword(pswrd save in db by hashing)
  const dbPassword = user.Password;
  bcrypt
    .compare(Password, dbPassword)
    .then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username and Password Combination" });
      } else {
        const accessToken = generateToken(user);

        // res.cookie("access-token", accessToken, {
        //   maxAge: 31556926,
        //   httpOnly: true, // add bcz any other user can't access another cookies
        // });
        res.status(201).json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          Gender: user.Gender,
          Address: user.Address,
          DOB: user.DOB,
          email: user.userName,
          accessToken,
          roleId: user.roleId,
          roleName: user?.role?.roleName,
          departmentId: user?.departmentId,
          departmentName: user?.department?.departmentName,
          projects: user.projects,
        });
      }
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: employee.controller.js ~ line 195 ~ getSingleUser ~ err",
        err
      );
      res.status(500).send({
        message: " Error Retrieving Employee with ssssssssssssid = ",
      });
    });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  console.log(
    "🚀 ~ file: employee.controller.js ~ line 103 ~ getUserProfile ~ user",
    user
  );

  // res.send("SUCCESS");

  if (user) {
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      Gender: user.Gender,
      Address: user.Address,
      DOB: user.DOB,
      email: user.userName,
    });
  } else {
    res.status(404);
    throw new Error("User Not FOund");
  }
});

const profile = asyncHandler(async (req, res) => {
  res.json("profile");
});

// Get All Employees
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const employees = await User.findAll();
    res.status(200).json({ employees });
  } catch (error) {
    console.log("error ", error);
    res.status(500);
    throw error;
  }
});

// Post Employee

// const addEmployee = asyncHandler(async (req, res) => {
//   // Validate Request
//   if (!req.body.firstName) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//     return;
//   }
//   const employee = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     Gender: req.body.Gender,
//     Address: req.body.Address,
//     DOB: req.body.DOB,
//     userName: req.body.userName,
//     Password: req.body.Password,
//     isAdmin: req.body.isAdmin,
//   };
//   // Save Employee in the database
//   Employee.create(employee)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial.",
//       });
//     });
// });

// Find Employee with an id
const getSingleUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: [
      "department",
      "role",
      {
        model: Project,
        as: "projects",
        through: { attributes: [] },
      },
    ],
  }).then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: " Cannot Find Employee with id = " + id,
      });
    }
  });
});

// Update Single Employee
const updateSingleUser = asyncHandler(async (req, res) => {
  // if(req.params.departmentId)
  const id = req.params.id;
  User.update(req.body, {
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
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    });
});

// Delete Employee
const deleteSingleUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  User.destroy({
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
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    });
});
module.exports = {
  login,
  register,
  getUserProfile,
  getAllUsers,
  // addEmployee,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
