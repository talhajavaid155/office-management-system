import { useContext } from "react";
import Employees from "../components/employee/Employees";
import { EmployeeContextType } from "../interfaces/EmployeeInterface";
import { EmployeeContext } from "../context/EmployeeContext";

const EmployeeScreen = () => {
  const { employees } = useContext(EmployeeContext) as EmployeeContextType;

  return <>{employees && <Employees />}</>;
};

export default EmployeeScreen;
