import React, { useContext, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Swal from "sweetalert2";
import { Api } from "../../api/Api";
import { EmployeeContext } from "../../context/EmployeeContext";
import {
  EmployeeContextType,
  IEmployeeInfo,
} from "../../interfaces/EmployeeInterface";

export interface IDepartmentInfo {
  id: string;
  departmentName: string;
}
const DepartmentAssignment = () => {
  const { userInfo } = useContext(EmployeeContext) as EmployeeContextType;

  const [userInputValue, setUserInputValue] = useState();
  const [departmentInputValue, setDepartmentInputValue] = useState();
  const [userSelectedValue, setUserSelectedValue] =
    useState<IEmployeeInfo | null>(null);
  const [departmentSelectedValue, setDepartmentSelectedValue] =
    useState<IDepartmentInfo | null>(null);

  // handle input change event
  const handleUserInputChange = (value: any) => {
    setUserInputValue(value);
  };

  // handle input change event
  const handleDepartmentInputChange = (value: any) => {
    setDepartmentInputValue(value);
  };

  // handle selection
  const handleUserChange = (value: any) => {
    setUserSelectedValue(value);
  };

  // handle selection
  const handleDepartmentChange = (value: any) => {
    setDepartmentSelectedValue(value);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };

  const fetchUsers = async () => {
    try {
      const { data } = await Api.get("/users", config);
      const filteredUsers = data.employees.filter((employee: any) => {
        return employee.departmentId === null;
      });
      console.log(
        "🚀 ~ file: departmentAssignment.tsx ~ line 60 ~ //data.employees.map ~ filteredUsers",
        filteredUsers
      );
      return filteredUsers;
    } catch (error) {
      console.log("Error Message" + error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data } = await Api.get("/department");
      return data.departments;
    } catch (error) {
      console.log("Error Message" + error);
    }
  };
  // Assigning department to user
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const depId = { departmentId: departmentSelectedValue?.id };
      const response = await Api.put(
        `/users/${userSelectedValue?.id}`,
        depId,
        config
      );

      setUserSelectedValue(null);
      setDepartmentSelectedValue(null);
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
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={userSelectedValue}
            loadOptions={fetchUsers}
            getOptionLabel={(e: IEmployeeInfo) =>
              `${e.firstName} ${e.lastName}`
            }
            getOptionValue={(e: IEmployeeInfo) => e.id}
            onInputChange={handleUserInputChange}
            onChange={handleUserChange}
          />
        </div>
        <div className="col-md-4">
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={departmentSelectedValue}
            loadOptions={fetchDepartments}
            getOptionLabel={(e: IDepartmentInfo) => e.departmentName}
            getOptionValue={(e: IDepartmentInfo) => e.id}
            onInputChange={handleDepartmentInputChange}
            onChange={handleDepartmentChange}
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

export default DepartmentAssignment;
