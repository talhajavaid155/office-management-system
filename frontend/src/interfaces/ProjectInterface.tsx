export interface Project {
  id?: number;
  Title: string;
  Description: string;
  assignedTo: string;
}

export type ProjectContextType = {
  projects?: Project[];
  postProject?: (project: Project) => void;
  updateProject?: (id: number) => void;
  deleteProject?: (id: number) => void;
  setProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
  setShowTasks?: React.Dispatch<React.SetStateAction<boolean>>;
  showTasks?: boolean;
};
