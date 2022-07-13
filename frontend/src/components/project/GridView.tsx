import _ from "lodash";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Api } from "../../api/Api";
import { ProjectContext } from "../../context/ProjectContext";
import { ProjectContextType } from "../../interfaces/ProjectInterface";

const GridView = () => {
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
        Api.delete(`/projects/${id}`);
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
      <div className="grid grid-cols-3 gap-10 py-20 ml-2  ">
        {_?.map(projects, (val, index) => {
          return (
            <div
              key={index}
              className="p-6 max-w-sm bg-outline-blue-700 rounded-lg border border-blue-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <p>{`id: ${val.id}`}</p>

              <p>{`Title: ${val.Title}`}</p>

              <p>{`Description: ${val.Description}`}</p>

              <p>{`Assigned To:  ${val.assignedTo}`}</p>
              <small>
                <button
                  className="ml-10"
                  onClick={() => {
                    deleteProjectHandler(val.id!);
                  }}
                >
                  <FaTrash className="ml-40  text-red-600 hover:text-red-800 hover:delay-200 cursor-pointer" />
                </button>
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridView;
