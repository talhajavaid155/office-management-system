import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Api } from "../../api/Api";
import AsyncSelect from "react-select/async";
import { EmployeeContext } from "../../context/EmployeeContext";
import {
  EmployeeContextType,
  IEmployeeInfo,
} from "../../interfaces/EmployeeInterface";
import Select from "react-select";

export interface IProjectInfo {
  id: string;
  Title: string;
}
export const ProjectAssignment = () => {
  const { userInfo } = useContext(EmployeeContext) as EmployeeContextType;

  const [userSelectedValue, setUserSelectedValue] = useState([]);
  const [projectSelectedValue, setProjectSelectedValue] = useState([]);

  const [userOptions, setUserOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

  const [projectInputValue, setProjectInputValue] = useState();

  // handle input change event
  // const handleUserInputChange = (value: any) => {
  //   setUserInputValue(value);
  // };

  // handle input change event
  // const handleProjectInputChange = (value: any) => {
  //   setProjectInputValue(value);
  // };

  // handle selection
  const handleUserChange = (value: any) => {
    console.log("SSSSSSSSSSSSSs" + typeof value);
    setUserSelectedValue(value.value);
    // setUserSelectedValue(value);
  };
  console.log(
    "🚀 ~ file: ProjectAssignment.tsx ~ line 143 ~ ProjectAssignment ~ userSelectedValue",
    userSelectedValue
  );
  console.log(
    "🚀 ~ file: ProjectAssignment.tsx ~ line 143 ~ ProjectAssignment ~ userSelectedValue",
    projectSelectedValue
  );
  // handle selection
  const handleProjectChange = (value: any) => {
    setProjectSelectedValue(
      value.map((val: any) => {
        return val.value;
      })
    );
  };
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };

  const fetchUsers = async () => {
    try {
      const { data } = await Api.get("/users", config);
      const allUsers = data.employees.filter((employee: any) => {
        return employee.departmentId === null;
      });

      const filteredUsers = allUsers.map((user: any) => {
        return {
          value: user.id,
          label: user.firstName,
        };
      });
      setUserOptions(filteredUsers);
      console.log(
        "🚀 ~ file: DepartmentAssignment.tsx ~ line 63 ~ filteredUsers ~ filteredUsers",
        filteredUsers
      );

      return allUsers;
    } catch (error) {
      console.log("Error Message" + error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await Api.get("/projects", config);
      const users = data.projects.map((project: any) => {
        return {
          value: project.id,
          label: project.Title,
        };
      });

      setProjectOptions(users);
      return users;
      // return data.departments;
    } catch (error) {
      console.log("Error Message" + error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  // Assigning department to user
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const projects = { projects: projectSelectedValue };

      const response = await Api.put(
        `/users/${userSelectedValue}`,
        projects,
        config
      );
      Swal.fire({
        title: "Department Assigned Successfully",

        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not Authorized",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <Select options={userOptions} onChange={handleUserChange} />
        </div>
        <div className="col-md-4">
          <Select
            isMulti
            options={projectOptions}
            onChange={handleProjectChange}
          />
        </div>
        <button
          type="button"
          onClick={submitHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
