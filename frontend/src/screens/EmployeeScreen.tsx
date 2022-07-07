import { useContext } from "react";
import Employees from "../components/employee/Employees";
import { EmployeeContextType } from "../interfaces/EmployeeInterface";
import { EmployeeContext } from "../context/EmployeeContext";
import Header from "../components/Header";
import DepartmentAssignment from "../components/employee/DepartmentAssignment";

const EmployeeScreen = () => {
  const { employees } = useContext(EmployeeContext) as EmployeeContextType;

  return (
    <div className="flex w-full">
      <Header />
      {employees && <Employees />}
    </div>
  );
};

export default EmployeeScreen;
