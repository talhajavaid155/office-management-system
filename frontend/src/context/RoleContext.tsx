import React, { createContext, useState } from "react";
import { Role, RoleContextType } from "../interfaces/RoleInterface";

export const RoleContext = createContext<RoleContextType | null>({});

export const ProjectProvider = (props: any) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showTasks, setShowTasks] = useState<boolean>(true);

  // console.log(projects);

  return (
    <RoleContext.Provider value={{ roles, setRoles, showTasks, setShowTasks }}>
      {props.children}
    </RoleContext.Provider>
  );
};
