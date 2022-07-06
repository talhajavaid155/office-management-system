import React, { createContext, useState } from "react";
import { Project, ProjectContextType } from "../interfaces/ProjectInterface";

export const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = (props: any) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showTasks, setShowTasks] = useState<boolean>(true);
  // console.log(projects);

  return (
    <ProjectContext.Provider
      value={{ projects, setProjects, showTasks, setShowTasks }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
