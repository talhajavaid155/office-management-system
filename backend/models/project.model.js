module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    Title: {
      type: Sequelize.STRING,
    },
  });
  return Project;
};
