module.exports = (sequelize, Sequelize) => {
  const Employee_Change_History = sequelize.define("employeeChangeHistory", {
    Resignation: {
      type: Sequelize.STRING,
    },
  });
  return Employee_Change_History;
};
