import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Swal from "sweetalert2";
import { EmployeeApi } from "../../api/Employee";

export interface IEmployeeData {
  id?: number;
  firstName?: string;
  lastName?: string;
  Gender?: string;
  Address?: string;
  DOB?: Date;
  userName?: string;
  Password?: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  departmentId?: number;
  department?: {};
  projects?: [];
}

export interface IEmployeeInfo {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IDepartmentInfo {
  id: string;
  departmentName: string;
}
const DepartmentAssignment = () => {
  const [userInputValue, setUserInputValue] = useState();
  const [departmentInputValue, setDepartmentInputValue] = useState();
  const [userSelectedValue, setUserSelectedValue] =
    useState<IEmployeeInfo | null>(null);
  const [departmentSelectedValue, setDepartmentSelectedValue] =
    useState<IDepartmentInfo | null>(null);
  const [userData, setUserData] = useState<any | null>([]);

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

  const fetchUsers = async () => {
    try {
      const { data } = await EmployeeApi.get("/employees");
      //   data.employees.map((employee: any) => {
      //     if (employee.departmentId === null) {
      //       console.log(
      //         "🚀 ~ file: departmentAssignment.tsx ~ line 67 ~ emp ~ employee.departmentId",
      //         employee.departmentId
      //       );
      //       setUserData(employee);
      //       return userData;
      //     }
      const filteredUsers = data.employees.filter((employee: any) => {
        return employee.departmentId === null;
      });

      return filteredUsers;
    } catch (error) {
      console.log("Error Message" + error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data } = await EmployeeApi.get("/department");
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
      const response = await EmployeeApi.put(
        `/employees/${userSelectedValue?.id}`,
        depId
      );

      setUserSelectedValue(null);
      setDepartmentSelectedValue(null);
      Swal.fire({
        title: "Form Updated Successfully",

        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row alert alert-info my-5">
        Selected Value:{JSON.stringify(userSelectedValue || {}, null, 2)}
      </div>
      <div className="row alert alert-info">
        Selected Value:{JSON.stringify(departmentSelectedValue || {}, null, 2)}
      </div>
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
        <button type="button" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DepartmentAssignment;
