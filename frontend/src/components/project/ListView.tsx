import _ from "lodash";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { ProjectApi } from "../../api/Project";
import { ProjectContext } from "../../context/ProjectContext";
import { ProjectContextType } from "../../interfaces/ProjectInterface";

const ListView = () => {
  const { projects, setProjects } = useContext(
    ProjectContext
  ) as ProjectContextType;

  console.log(
    "🚀 ~ file: ListView.tsx ~ line 11 ~ ListView ~ projects",
    projects
  );

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
    <ul className="list-group py-20 mr-10">
      {_.map(projects, (val, index) => {
        return (
          <li
            key={index}
            className="col-span-1 list-group-item  list-group-item-action flex-column align-items-start  d-flex w-85 justify-content-between"
          >
            <h5 className="mb-1">{`Id: ${val.id}`}</h5>

            <h5 className="mb-1">{`Title: ${val.Title}`}</h5>
            <h5 className="mb-1">{`${val.projectImage}`}</h5>
            {/* <img src="http://localhost:5000/download%20(4).png" /> */}

            <small>
              <button
                className="ml-80"
                onClick={() => {
                  deleteProjectHandler(val.id!);
                }}
              >
                <FaTrash className=" text-red-600 hover:text-red-800 hover:delay-200 cursor-pointer" />
              </button>
            </small>
          </li>
        );
      })}
    </ul>
  );
};

export default ListView;
