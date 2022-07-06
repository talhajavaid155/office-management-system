import React, { createContext, useState } from "react";
import { Employee, EmployeeContextType } from "../interfaces/EmployeeInterface";

export const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const EmployeeProivder = (props: any) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showTasks, setShowTasks] = useState<boolean>(true);
  console.log(employees);

  return (
    <EmployeeContext.Provider
      value={{ employees, setEmployees, showTasks, setShowTasks }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};
