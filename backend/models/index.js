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
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.department = require("./department.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.designation = require("./designation.model.js")(sequelize, Sequelize);
db.employeeChangeHistory = require("./employeeChangeHistory.model.js")(
  sequelize,
  Sequelize
);

//Assocations
// One to many relationship between employee and department
db.department.hasMany(db.employee, { as: "employee" });
db.employee.belongsTo(db.department, {
  foreignKey: "departmentId",
  allowNull: false,
  as: "department",
});

// Many to many relationship between employee and project
db.employee.belongsToMany(db.project, {
  through: "employeeProject",
  as: "projects",
  foreignKey: "employeeId",
});
db.project.belongsToMany(db.employee, {
  through: "employeeProject",
  as: "employees",
  foreignKey: "projectId",
});

// One-to-Many relationship between employee and designation
// db.designation.hasMany(db.employee, { as: "employee" });
// db.employee.belongsTo(db.designation, {
//   foreignKey: "designationId",
//   allowNull: false,
//   as: "designation",
// });
// db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
