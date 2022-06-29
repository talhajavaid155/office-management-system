module.exports = (sequelize, Sequelize) => {
  const Designation = sequelize.define("designation", {
    designationName: {
      type: Sequelize.STRING,
    },
    designationGrade: {
      type: Sequelize.STRING,
    },
    designationSalary: {
      type: Sequelize.STRING,
    },
  });
  return Designation;
};
