module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
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
  });
  return User;
};
