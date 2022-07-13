const dbConfig = require("../db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //   operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.department = require("./department.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.designation = require("./designation.model.js")(sequelize, Sequelize);
db.employeeChangeHistory = require("./employeeChangeHistory.model.js")(
  sequelize,
  Sequelize
);

//Assocations
// One to many relationship between employee and department
db.department.hasMany(db.user, { as: "user" });
db.user.belongsTo(db.department, {
  foreignKey: "departmentId",
  allowNull: false,
  as: "department",
});

// One to many relationship between user and role
db.role.hasMany(db.user, { as: "user" });
db.user.belongsTo(db.role, {
  foreignKey: "roleId",
  allowNull: false,
  as: "role",
});

// Many to many relationship between employee and project
db.user.belongsToMany(db.project, {
  through: "userProject",
  as: "projects",
  foreignKey: "userId",
});
db.project.belongsToMany(db.user, {
  through: "userProject",
  as: "users",
  foreignKey: "projectId",
});

// One-to-Many relationship between employee and designation
db.designation.hasMany(db.user, { as: "user" });
db.user.belongsTo(db.designation, {
  foreignKey: "designationId",
  allowNull: false,
  as: "designation",
});
// db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
