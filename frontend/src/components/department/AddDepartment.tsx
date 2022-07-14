import React, { useContext, useEffect, useState } from "react";
import { DepartmentContext } from "../../context/DepartmentContext";
import { DepartmentContextType } from "../../interfaces/DepartmentInterface";
import _ from "lodash";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DepartmentAssignment from "./DepartmentAssignment";
import { Api } from "../../api/Api";
const AddDepartment = () => {
  const { departments, setDepartments, setShowTasks, showTasks } = useContext(
    DepartmentContext
  ) as DepartmentContextType;

  const [departmentName, setdepartmentName] = useState("");

  useEffect(() => {
    const departmentData = async () => {
      try {
        const { data } = await Api.get("/department");
        // console.log(data);
        console.log("departments ", data);
        setDepartments?.(data?.departments);
      } catch (error) {
        console.log("Error Message" + error);
      }
    };
    departmentData();
  }, [showTasks]);
  console.log("departments", departments);
  const onSubmit = (e: any) => {
    e.preventDefault();

    Api.post("/department", {
      departmentName: departmentName,
    }).then((response) => {
      console.log(response.data);
    });

    setShowTasks?.(!showTasks);
  };

  const deleteDepartmentHandler = (id: number) => {
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
        Api.delete(`/department/${id}`);
        setDepartments?.(
          departments!.filter((department) => {
            return department.id !== id;
          })
        );
        Swal.fire("Deleted!", "Department has been deleted.", "success");
      }
    });
  };
  return (
    <div className="ml-40 ">
      <form className="w-4/5 p-7" onSubmit={onSubmit}>
        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="departmentname"
              id="departmentname"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setdepartmentName(e.target.value)}
            />
            <label
              htmlFor="departmentname"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Department name
            </label>
          </div>
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
      <DepartmentAssignment />

      <h1 className="pt-3">Department Names</h1>
      <div className="grid grid-cols-1 py-10 sm:grid-cols-2 lg:grid-cols-3 gap-20">
        {_?.map(departments, (val, index) => {
          return (
            <div
              key={index}
              className="p-2 mr-10 max-w-sm bg-outline-blue-700 rounded-lg border border-blue-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <Link
                to={`/department/${val.id}`}
                className="inline-flex items-center py-2 px-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {val.departmentName}
              </Link>
              <button
                className="ml-10"
                onClick={() => {
                  deleteDepartmentHandler(val.id!);
                }}
              >
                <FaTrash className="text-red-600 hover:text-red-800 hover:delay-200 cursor-pointer" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddDepartment;
