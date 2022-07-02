const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";

  // Email checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username field is required";
  }
  // else if (!Validator.isEmail(data.userName)) {
  //     errors.userName = "Username is invalid";
  //   }

  // Password checks
  if (Validator.isEmpty(data.Password)) {
    errors.Password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
