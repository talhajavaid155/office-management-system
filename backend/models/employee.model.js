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
      type: Sequelize.DATE,
    },
  });
  return Employee;
};
