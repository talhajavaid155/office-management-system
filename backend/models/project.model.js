module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    Title: {
      type: Sequelize.STRING,
    },
    Description: {
      type: Sequelize.STRING,
    },
    assignedTo: {
      type: Sequelize.STRING,
    },
  });
  return Project;
};
