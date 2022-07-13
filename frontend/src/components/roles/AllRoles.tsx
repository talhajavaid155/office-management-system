import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Api } from "../../api/Api";

const AllRoles = () => {
  const [Roles, setRoles] = useState();
  const [roleName, setRoleName] = useState("");
  useEffect(() => {
    const roleData = async () => {
      try {
        const { data } = await Api.get("/roles");
        // console.log(data);
        console.log("roles ", data);
        setRoles?.(data?.roles);
      } catch (error) {
        console.log("Error Message" + error);
      }
    };
    roleData();
  }, []);
  const onSubmit = (e: any) => {
    e.preventDefault();

    Api.post("/roles", {
      roleName,
    }).then((response) => {
      console.log(response.data);
    });

    // setdepartmentName("");
    // setShowTasks?.(!showTasks);
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
        Api.delete(`/roles/${id}`);
        Swal.fire("Deleted!", "Department has been deleted.", "success");
      }
    });
  };

  return (
    <div className="ml-10 ">
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
              onChange={(e) => setRoleName(e.target.value)}
            />
            <label
              htmlFor="departmentname"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Role name
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
      <h1 className="pt-3">Department Names</h1>
      <div className="grid grid-cols-3 gap-20 py-20 ml-2 ">
        {_?.map(Roles, (role: any) => {
          return (
            <div
              key={role.id}
              className="p-6 max-w-sm bg-outline-blue-700 rounded-lg border border-blue-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <Link
                to={`/department/${role.id}`}
                className="inline-flex items-center py-2 px-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {role.roleName}
              </Link>
              <button
                className="ml-10"
                disabled={role.roleName === "Admin"}
                onClick={() => {
                  deleteDepartmentHandler(role.id);
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

export default AllRoles;
