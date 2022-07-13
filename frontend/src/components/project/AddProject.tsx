import React, { useContext, useEffect, useState } from "react";
import { Api } from "../../api/Api";
import { ProjectContext } from "../../context/ProjectContext";
import { ProjectContextType } from "../../interfaces/ProjectInterface";
import GridView from "./GridView";
import ListView from "./ListView";
import MasonryView from "./MasonryView";
const AddProject = () => {
  const { projects, setProjects, setShowTasks, showTasks } = useContext(
    ProjectContext
  ) as ProjectContextType;
  const [title, setTitle] = useState("");

  const [image, setImage] = useState<string | Blob>();
  useEffect(() => {
    const projectData = async () => {
      try {
        const { data } = await Api.get("/projects");
        console.log("projects ", data);
        setProjects?.(data.projects);
      } catch (error) {
        console.log("Error Message" + error);
      }
    };
    projectData();
  }, [showTasks]);
  console.log("projects", projects);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectImage", image!);
    formData.append("title", title);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Api.post("/projects", formData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log("err", err));

    setShowTasks?.(!showTasks);
  };

  // const deleteProjectHandler = (id: number) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       ProjectApi.delete(`/projects/${id}`);
  //       setProjects?.(
  //         projects!.filter((project) => {
  //           return project.id !== id;
  //         })
  //       );
  //       Swal.fire("Deleted!", "Project has been deleted.", "success");
  //     }
  //   });
  // };
  const [gridView, setgridView] = useState(true);
  const [listView, setlistView] = useState(false);
  const [masonryView, setmasonryView] = useState(false);

  return (
    <div className="ml-20 ">
      <form className="w-4/5 p-7" onSubmit={onSubmit}>
        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="Title"
              id="Title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="Title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Project Title
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="file"
            name="projectImage"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            onChange={(e) => setImage(e.target.files![0])}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
      <br />
      <br />
      <button
        className="btn btn-outline-primary mx-3 "
        onClick={() => {
          setgridView(true);
          setlistView(false);
          setmasonryView(false);
          setShowTasks?.(!showTasks);
          console.log(gridView);
        }}
      >
        Grid View
      </button>

      <button
        className="btn btn-outline-primary mx-3"
        onClick={() => {
          setlistView(true);
          setgridView(false);
          setmasonryView(false);
          setShowTasks?.(!showTasks);

          console.log(listView);
        }}
      >
        List View
      </button>

      <button
        className="btn btn-outline-primary mx-3"
        onClick={() => {
          setmasonryView(true);
          setgridView(false);
          setShowTasks?.(!showTasks);
          setlistView(false);
          console.log(masonryView);
        }}
      >
        Masonry View
      </button>

      {gridView ? <GridView /> : ""}
      {listView ? <ListView /> : ""}
      {masonryView ? <MasonryView /> : ""}
    </div>
  );
};

export default AddProject;
