import React from "react";
import AddEmployeeHistory from "../components/employeeChangeHistory/AddEmployeeHistory";
import Header from "../components/Header";
import { EmployeeHistoryProivder } from "../context/EmployeeHistoryContext";

const EmployeeHistoryScreen = () => {
  return (
    <div className="flex">
      <EmployeeHistoryProivder>
        <Header />
        <AddEmployeeHistory />
      </EmployeeHistoryProivder>
    </div>
  );
};

export default EmployeeHistoryScreen;
