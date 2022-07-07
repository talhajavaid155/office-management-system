import { createContext, useState } from "react";
import {
  Department,
  DepartmentContextType,
} from "../interfaces/DepartmentInterface";

export const DepartmentContext = createContext<DepartmentContextType | null>(
  null
);

export const DepartmentProvider = (props: any) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showTasks, setShowTasks] = useState<boolean>(true);

  return (
    <DepartmentContext.Provider
      value={{ departments, setDepartments, showTasks, setShowTasks }}
    >
      {props.children}
    </DepartmentContext.Provider>
  );
};
