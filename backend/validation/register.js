const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.Address = !isEmpty(data.Address) ? data.Address : "";
  data.Gender = !isEmpty(data.Gender) ? data.Gender : "";
  data.DOB = !isEmpty(data.DOB) ? data.DOB : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";
  data.userIsAdmin = !isEmpty(data.userIsAdmin) ? data.userIsAdmin : "";

  // Name checks

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  } else if (!Validator.isLength(data.firstName, { min: 3, max: 30 })) {
    errors.firstName = "First name must be between 3 to 30 characters";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name field is required";
  } else if (!Validator.isLength(data.lastName, { min: 3, max: 30 })) {
    errors.lastName = "Last name must be between 3 to 30 characters";
  }

  if (Validator.isEmpty(data.Address)) {
    errors.Address = "Address field is required";
  }

  if (Validator.isEmpty(data.Gender)) {
    errors.Gender = "Gender field is required";
  }
  if (Validator.isEmpty(data.DOB)) {
    errors.DOB = "DOB field is required";
  }
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username field is required";
  } else if (!Validator.isLength(data.userName, { min: 3, max: 30 })) {
    errors.userName = "Username must be at least 3 characters";
  }
  // Password checks
  if (Validator.isEmpty(data.Password)) {
    errors.Password = "Password field is required";
  } else if (!Validator.isLength(data.Password, { min: 3, max: 30 })) {
    errors.Password = "Password must be at least 3 characters";
  }

  // UserIsAdmin checks
  // if (Validator.isEmpty(data.isAdmin)) {
  //   errors.isAdmin = "Admin field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// {
//   "firstName": "talha" ,
//   "lastName": "javaid",
//   "Gender":"male" ,
//   "Address": "tonwship",
//   "DOB": "2000-03-28",
//   "userName": ,
//   "Password": ,
//   "isAdmin": ,
// }
