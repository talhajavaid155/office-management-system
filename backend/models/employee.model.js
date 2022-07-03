module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    Gender: {
      type: Sequelize.STRING,
    },
    Address: {
      type: Sequelize.STRING,
    },
    DOB: {
      type: Sequelize.DATEONLY,
    },
    userName: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.INTEGER,
      defaultValue: "0",
    },
  });
  return Employee;
};
