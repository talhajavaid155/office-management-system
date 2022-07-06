import { createContext, useState } from "react";
import {
  EmployeeHistory,
  EmployeeHistoryContextType,
} from "../interfaces/EmployeeHistoryInterface";

export const EmployeeHistoryContext =
  createContext<EmployeeHistoryContextType | null>(null);

export const EmployeeHistoryProivder = (props: any) => {
  const [employeeHistory, setemployeeHistory] = useState<EmployeeHistory[]>([]);
  const [showTasks, setShowTasks] = useState<boolean>(true);

  return (
    <EmployeeHistoryContext.Provider
      value={{ employeeHistory, setemployeeHistory, showTasks, setShowTasks }}
    >
      {props.children}
    </EmployeeHistoryContext.Provider>
  );
};
