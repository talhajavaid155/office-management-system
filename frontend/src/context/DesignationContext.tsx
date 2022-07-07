import { createContext, useState } from "react";
import {
  Designation,
  DesignationContextType,
} from "../interfaces/DesignationInterface";

export const DesignationContext = createContext<DesignationContextType | null>(
  null
);

export const DesignationProivder = (props: any) => {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [showTasks, setShowTasks] = useState<boolean>(true);

  return (
    <DesignationContext.Provider
      value={{ designations, setDesignations, showTasks, setShowTasks }}
    >
      {props.children}
    </DesignationContext.Provider>
  );
};
