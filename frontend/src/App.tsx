import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
// import Header from "./components/Header";
import LoginPage from "./screens/Login";
import SignupPage from "./screens/Signup";
// import EditEmployee from "./components/employee/EditEmployee";

import DesignationScreen from "./screens/DesignationScreen";
import DepartmentScreen from "./screens/DepartmentScreen";
import EmployeeHistoryScreen from "./screens/EmployeeHistoryScreen";
import ProjectScreen from "./screens/ProjectScreen";
import SingleDepartment from "./screens/SingleDepartment";
import EmployeeScreen from "./screens/EmployeeScreen";
import RolesScreen from "./screens/RolesScreen";
import ProfileScreen from "./screens/ProfileScreen";
// import HomeScreen from "./screens/HomeScreen";

function App() {
  // const { showTasks } = useContext(EmployeeContext) as EmployeeContextType;

  return (
    <BrowserRouter>
      <div className="w-full">
        <main>
          <Switch>
            <Route path="/homepage" exact component={HomeScreen} />
            <Route path="/" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/employees" exact component={EmployeeScreen} />
            <Route path="/roles" exact component={RolesScreen} />

            <Route
              path="/department"
              exact
              component={DepartmentScreen}
            ></Route>
            <Route
              path="/designation"
              exact
              component={DesignationScreen}
            ></Route>
            <Route
              path="/history"
              exact
              component={EmployeeHistoryScreen}
            ></Route>
            <Route path="/project" exact component={ProjectScreen}></Route>
            <Route
              path="/department/:id"
              exact
              component={SingleDepartment}
            ></Route>
            <Route path="/profile" exact component={ProfileScreen}></Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>

    // </div>
    // {/* <HomeScreen /> */}{/* <Header /> */}
  );
}

// <div className="flex">
//   <div className="bg-dark-purple h-screen">SideBar</div>
//   <div>Homepage</div>
// </div>
export default App;
