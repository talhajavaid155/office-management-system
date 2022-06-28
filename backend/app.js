const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

const EmployeeRouter = require("./routes/employee.routes");
const ProjectRouter = require("./routes/project.routes");
const DepartmentRouter = require("./routes/department.routes");
const DesignationRouter = require("./routes/designation.routes");
const EmployeeChangeHistoryRouter = require("./routes/employeechangehistory.routes");
app.use(cors(corsOptions));

const db = require("./models");

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Employee Routes
app.use("/employees", EmployeeRouter);
app.use("/projects", ProjectRouter);
app.use("/department", DepartmentRouter);
app.use("/designation", DesignationRouter);
app.use("/employeechangehistory", EmployeeChangeHistoryRouter);

// require("./routes/tutorial.routes")(app);
// set port, listen for requests

// Test DB
// db.sequelize.sync();
db.sequelize
  .authenticate()
  .then(() => "DATABASE Connected!")
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
