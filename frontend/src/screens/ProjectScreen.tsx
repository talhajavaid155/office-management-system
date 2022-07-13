import Header from "../components/Header";
import AddProject from "../components/project/AddProject";
import { ProjectProvider } from "../context/ProjectContext";

const ProjectScreen = () => {
  return (
    <div>
      <div className="flex">
        <ProjectProvider>
          <Header />
          <AddProject />
        </ProjectProvider>
      </div>
    </div>
  );
};

export default ProjectScreen;
