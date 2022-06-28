module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
    departmentName: {
      type: Sequelize.STRING,
    },
  });
  return Department;
};
