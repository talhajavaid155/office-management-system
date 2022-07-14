import _ from "lodash";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Api } from "../../api/Api";
import { ProjectContext } from "../../context/ProjectContext";
import { ProjectContextType } from "../../interfaces/ProjectInterface";
const MasonryView = () => {
  const { projects, setProjects } = useContext(
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
    <div className="masonry sm:masonry-sm md:masonry-md py-20 mr-10 ">
      {_?.map(projects, (val, index) => {
        return (
          <>
            <div
              key={index}
              className="bg-gray-700 text-white p-1 break-inside "
            >
              <p> {`Title: ${val.Title}`}</p>
            </div>
            <div className="bg-gray-700 text-white p-1 break-inside ">
              <img
                src={`http://localhost:5000/${val.projectImage}`}
                alt="project image"
              />
            </div>
            <div className="bg-gray-700 text-white p-1 break-inside ">
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
            </div>{" "}
          </>
        );
      })}
    </div>
  );
};

export default MasonryView;
