import _ from "lodash";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { ProjectApi } from "../../api/Project";
import { ProjectContext } from "../../context/ProjectContext";
import { ProjectContextType } from "../../interfaces/ProjectInterface";

const ListView = () => {
  const { projects, setProjects, setShowTasks, showTasks } = useContext(
    ProjectContext
  ) as ProjectContextType;

  const deleteProjectHandler = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ProjectApi.delete(`/projects/${id}`);
        setProjects?.(
          projects!.filter((project) => {
            return project.id !== id;
          })
        );
        Swal.fire("Deleted!", "Project has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <div className="list-group py-20">
        {_.map(projects, (val, index) => {
          return (
            <div
              key={index}
              className="list-group-item list-group-item-action flex-column align-items-start  d-flex w-100 justify-content-between"
            >
              <h5 className="mb-1">{`Description: ${val.Description}`}</h5>

              <h5 className="mb-1">{`Title: ${val.Title}`}</h5>
              <h5 className="mb-1">{`Description: ${val.Description}`}</h5>
              <h5 className="mb-1">{`Assigned To: ${val.assignedTo}`}</h5>

              <small>
                <button
                  className="ml-60"
                  onClick={() => {
                    deleteProjectHandler(val.id!);
                  }}
                >
                  <FaTrash className="ml-60 text-red-600 hover:text-red-800 hover:delay-200 cursor-pointer" />
                </button>
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListView;
