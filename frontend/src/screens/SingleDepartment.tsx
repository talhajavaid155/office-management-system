import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api } from "../api/Api";
import { Department } from "../interfaces/DepartmentInterface";
import { IEmployeeData } from "../interfaces/EmployeeInterface";

const SingleDepartment = ({ match }: any) => {
  const depId = match.params.id;
  const [Employees, setEmployees] = useState<IEmployeeData[]>();
  const [Dep, setDep] = useState<Department>();

  useEffect(() => {
    const department = async () => {
      try {
        const { data } = await Api.get(`/department/${depId}`);
        console.log(
          "🚀 ~ file: SingleDepartment.tsx ~ line 15 ~ department ~ data",
          data
        );
        // console.log(data);
        setDep?.(data);
        setEmployees?.(data?.user);
      } catch (error) {
        console.log("Error Message" + error);
      }
    };
    department();
  }, []);
  console.log(
    "🚀 ~ file: SingleDepartment.tsx ~ line 27 ~ SingleDepartment ~ Employees",
    Employees
  );

  return (
    <div className="p-7 w-full">
      <div className="flex justify-between">
        <h1 className="p-7 text-lg font-bold">
          Department Name: {Dep?.departmentName}
        </h1>
        <Link to={`/department`}>
          <button className="m-7 bg-transparent ml-auto hover:bg-blue-500 text-blue-700 font-semibold hover:text-blue-800 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Back
          </button>
        </Link>
      </div>

      {Employees?.length !== 0 ? (
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        Id
                      </th>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        First Name
                      </th>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        Last Name
                      </th>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        Gender
                      </th>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        Address
                      </th>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        DOB
                      </th>
                    </tr>
                  </thead>
                  {_.map(Employees, (employee: any, key: any) => {
                    return (
                      <tr key={key}>
                        <td className="p-3 text-sm whitespace-nowrap">
                          {employee.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.Gender}
                        </td>
                        <td
                          onClick={(e) => {
                            // formdata(error)
                          }}
                        >
                          {employee.Address}
                        </td>
                        <td>{employee.DOB.toString().slice(0, 10)}</td>
                        <td>{employee.createdAt.toString().slice(0, 10)}</td>
                        <td>{employee.updatedAt.toString().slice(0, 10)}</td>
                      </tr>
                    );
                  })}
                  {/* {employees &&
              employees_.map((employee: any, key: any) => {
                return (
                  <tr key={key}>
                    <td className="p-3 text-sm whitespace-nowrap">
                      {employee.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {employee.Gender}
                    </td>
                    <td
                      onClick={(e) => {
                        // formdata(error)
                      }}
                    >
                      {employee.Address}
                    </td>
                    <td>{employee.DOB.toString().slice(0, 10)}</td>
                    <td>{employee.createdAt.toString().slice(0, 10)}</td>
                    <td>{employee.updatedAt.toString().slice(0, 10)}</td>
                    <div className="flex">
                      <button
                        onClick={() => {
                          deleteEmployeeHandler(employee.id);
                        }}
                      >
                        <FaTrash className="my-7 mx-3 text-red-600 hover:text-red-800 hover:delay-200 cursor-pointer" />
                      </button>
                      <button
                        onClick={() => {
                          SetcurrentEditingEmployee(employee);
                        }}
                      >
                        <FaEdit className="my-7 mx-3 text-blue-500 hover:text-blue-800 hover:delay-200 cursor-pointer" />
                      </button>
                    </div>
                  </tr>
                );
              })} */}
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="p-10">No Employees to Show</h1>
      )}
    </div>
  );
};

export default SingleDepartment;
