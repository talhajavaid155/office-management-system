import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import EmployeeScreen from "./screens/EmployeeScreen";
import LoginPage from "./screens/Login";
import SignupPage from "./screens/Signup";
// import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    // <div className="flex">
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <main>
          <Route path="/homepage" exact component={HomeScreen} />
          <Route path="/" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/employees" exact component={EmployeeScreen} />
        </main>
      </div>
    </div>
    // </div>
    // {/* <HomeScreen /> */}{/* <Header /> */}
  );
}

// <div className="flex">
//   <div className="bg-dark-purple h-screen">SideBar</div>
//   <div>Homepage</div>
// </div>
export default App;
