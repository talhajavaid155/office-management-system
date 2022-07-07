import React from "react";
import AddDepartment from "../components/department/AddDepartment";
import Header from "../components/Header";
import { DepartmentProvider } from "../context/DepartmentContext";

const DepartmentScreen = () => {
  return (
    <div className="flex">
      <DepartmentProvider>
        <Header />
        <AddDepartment />
      </DepartmentProvider>
    </div>
  );
};

export default DepartmentScreen;
