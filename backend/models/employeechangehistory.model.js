module.exports = (sequelize, Sequelize) => {
  const Resignation = sequelize.define("resignation", {
    employeeResignation: {
      type: Sequelize.STRING,
    },
  });
  return Resignation;
};
