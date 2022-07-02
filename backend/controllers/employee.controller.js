const db = require("../models");
const Employee = db.employee;
const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt"); //for hashing
const { createTokens, validateToken } = require("./jwt");

const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

const register = asyncHandler(async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json({ ...errors, validationFormType: "register" });
  }

  Employee.findOne({ where: { userName: req.body.userName } }).then((user) => {
    if (user) {
      return res.status(400).json({
        userName: "Username already exists",
        validationFormType: "register",
      });
    } else {
      const {
        firstName,
        lastName,
        Gender,
        Address,
        DOB,
        userName,
        Password,
        isAdmin,
      } = req.body;
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        Gender: Gender,
        Address: Address,
        DOB: DOB,
        userName: userName,
        Password: Password,
        isAdmin: isAdmin,
      };
      /////same username errors...
      //   if (err) throw err;
      bcrypt.hash(newUser.Password, 10).then((hash) => {
        newUser.Password = hash;
        Employee.create(newUser)
          .then((data) => {
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

  const user = await Employee.findOne({ where: { userName: userName } });
  if (!user) {
    res.status(400).json({ error: "Username not exist" });
  }
  //dbPassword(pswrd save in db by hashing)
  const dbPassword = user.Password;
  bcrypt.compare(Password, dbPassword).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username and Password Combination" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 31556926,
        httpOnly: true, // add bcz any other user can't access another cookies
      });
      res.json("LOGGED IN");
    }
  });
});

const profile = asyncHandler(async (req, res) => {
  res.json("profile");
});

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
  login,
  register,
  profile,
  getAllEmployees,
  // addEmployee,
  getSingleEmployee,
  updateSingleEmployee,
  deleteSingleEmployee,
};
