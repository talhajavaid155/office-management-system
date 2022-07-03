import { Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import EmployeeScreen from "./screens/EmployeeScreen";
import EditEmployee from "./components/employee/EditEmployee";
// import HomeScreen from "./screens/HomeScreen";

function App() {
  // const { showTasks } = useContext(EmployeeContext) as EmployeeContextType;

  return (
    <div className="flex">
      <Header />

      <main className="w-full">
        <Route path="/" exact component={HomeScreen} />
        <Route path="/employees" component={EmployeeScreen} />
        {/* <Route path="/addemployee" component={AddEmployee} /> */}
        <Route path="/editemployee" component={EditEmployee} />
      </main>

      {/* <HomeScreen /> */}
    </div>
    // <div className="flex">
    //   <div className="bg-dark-purple h-screen">SideBar</div>
    //   <div>Homepage</div>
    // </div>
  );
}

export default App;
