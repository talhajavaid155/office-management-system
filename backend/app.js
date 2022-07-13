const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};

const UserRouter = require("./routes/user.routes");
const RoleRouter = require("./routes/role.routes");
const ProjectRouter = require("./routes/project.routes");
const DepartmentRouter = require("./routes/department.routes");
const DesignationRouter = require("./routes/designation.routes");
const EmployeeChangeHistoryRouter = require("./routes/employeeChangeHistory.routes");
app.use(cors(corsOptions));
app.use(cookieParser());
const db = require("./models");

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Employee Routes
app.use("/users", UserRouter);
app.use("/roles", RoleRouter);

app.use("/projects", ProjectRouter);
app.use("/department", DepartmentRouter);
app.use("/designation", DesignationRouter);
app.use("/employeechangehistory", EmployeeChangeHistoryRouter);
app.use(express.static("uploads"));

// require("./routes/tutorial.routes")(app);
// set port, listen for requests

// Test DB
// db.sequelize.sync({ alter: true });
db.sequelize
  .authenticate()
  .then(() => "DATABASE Connected!")
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
