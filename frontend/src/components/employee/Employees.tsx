import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { EmployeeApi } from "../../api/Employee";
import { EmployeeContext } from "../../context/EmployeeContext";
import _ from "lodash";
import { EmployeeContextType } from "../../interfaces/EmployeeInterface";
import { Employee } from "../../interfaces/EmployeeInterface";
import Swal from "sweetalert2";
import EmployeeForm from "./EmployeeForm";
// import withReactContent from "sweetalert2-react-content";

// const EmployeeSwal = withReactContent(Swal);

const Employees = () => {
  const [currentEditingEmployee, setcurrentEditingEmployee] = useState({});
  const { employees, setEmployees, showTasks } = useContext(
    EmployeeContext
  ) as EmployeeContextType;
  useEffect(() => {
    const empoloyeeData = async () => {
      try {
        const { data } = await EmployeeApi.get("/employees");
        // console.log(data?.employees);
        console.log(data);
        setEmployees?.(data?.employees);
      } catch (error) {
        console.log("Error Message" + error);
      }
    };
    empoloyeeData();
  }, [showTasks]);

  const deleteEmployeeHandler = (id: number) => {
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
        EmployeeApi.delete(`/employees/${id}`);
        setEmployees?.(
          employees!.filter((employee) => {
            return employee.id !== id;
          })
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-7">
      <EmployeeForm employeeFormData={currentEditingEmployee} />
      {/* <EmployeeForm employeeData={currentlyEdtiitng}/> */}
      {/* table */}
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
                    <th className="p-3 text-sm font-semibold tracking wide text-left">
                      Created At
                    </th>
                    <th className="p-3 text-sm font-semibold tracking wide text-left">
                      Updated At
                    </th>
                  </tr>
                </thead>
                {_.map(employees, (employee: any, key: any) => {
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
                            setcurrentEditingEmployee(employee);
                          }}
                        >
                          <FaEdit className="my-7 mx-3 text-blue-500 hover:text-blue-800 hover:delay-200 cursor-pointer" />
                        </button>
                      </div>
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
    </div>
  );
};

export default Employees;
