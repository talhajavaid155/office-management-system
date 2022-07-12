module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    roleName: {
      type: Sequelize.STRING,
    },
  });
  return Role;
};
