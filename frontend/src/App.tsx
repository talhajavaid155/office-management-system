import { Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import EmployeeScreen from "./screens/EmployeeScreen";
import LoginPage from "./screens/Login";
import SignupPage from "./screens/Signup";

import DesignationScreen from "./screens/DesignationScreen";
import DepartmentScreen from "./screens/DepartmentScreen";
import EmployeeHistoryScreen from "./screens/EmployeeHistoryScreen";
import ProjectScreen from "./screens/ProjectScreen";
// import HomeScreen from "./screens/HomeScreen";

function App() {
  // const { showTasks } = useContext(EmployeeContext) as EmployeeContextType;

  return (
    <div className="w-full">
      <main>
        <Route path="/homepage" exact component={HomeScreen} />
        <Route path="/" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/employees" exact component={EmployeeScreen} />
        <Route path="/department" exact component={DepartmentScreen}></Route>
        <Route path="/designation" exact component={DesignationScreen}></Route>
        <Route path="/history" exact component={EmployeeHistoryScreen}></Route>
        <Route path="/project" exact component={ProjectScreen}></Route>
      </main>
    </div>
    // {/* <HomeScreen /> */}{/* <Header /> */}
  );
}

// <div className="flex">
//   <div className="bg-dark-purple h-screen">SideBar</div>
//   <div>Homepage</div>
// </div>
export default App;
