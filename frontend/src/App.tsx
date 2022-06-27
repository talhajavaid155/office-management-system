import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import EmployeeScreen from "./screens/EmployeeScreen";
// import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <div className="flex">
      <Header />
      <main>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/employees" component={EmployeeScreen} />
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
