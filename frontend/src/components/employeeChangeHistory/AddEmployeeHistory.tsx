import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Api } from "../../api/Api";
import { EmployeeHistoryContext } from "../../context/EmployeeHistoryContext";
import { EmployeeHistoryContextType } from "../../interfaces/EmployeeHistoryInterface";

const AddEmployeeHistory = () => {
  const { employeeHistory, setemployeeHistory, setShowTasks, showTasks } =
    useContext(EmployeeHistoryContext) as EmployeeHistoryContextType;

  const [Resignation, setResignation] = useState("");

  useEffect(() => {
    const employeeHistoryData = async () => {
      try {
        const { data } = await Api.get("/employeechangehistory");
        console.log("history  ", data);
        setemployeeHistory?.(data?.employeeChangeHistory);
      } catch (error) {
        console.log("Error Message" + error);
      }
    };
    employeeHistoryData();
  }, [showTasks]);
  console.log("empHistory ", employeeHistory);

  const onSubmit = (e: any) => {
    e.preventDefault();
    Api.post("/employeechangehistory", {
      Resignation: Resignation,
    }).then((response) => {
      console.log(response.data);
    });
    setShowTasks?.(!showTasks);
  };

  const deleteHistoryHandler = (id: number) => {
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
        Api.delete(`/employeechangehistory/${id}`);
        setemployeeHistory?.(
          employeeHistory!.filter((employeeHistory) => {
            return employeeHistory.id !== id;
          })
        );
        Swal.fire("Deleted!", "EMployee History has been deleted.", "success");
      }
    });
  };
  return (
    <div className="p-7 w-full">
      <form className="w-4/5 p-7" onSubmit={onSubmit}>
        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="Resignation"
              id="floating_resignation"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setResignation(e.target.value)}
            />
            <label
              htmlFor="floating_resignation"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Resignation
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
      <div>
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
                        Resignation
                      </th>

                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {_.map(employeeHistory, (val, key) => {
                    return (
                      <tr key={key}>
                        <td className="p-3 text-sm whitespace-nowrap">
                          {val.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {val.Resignation}
                        </td>

                        <div className="flex">
                          <button
                            onClick={() => {
                              deleteHistoryHandler(val.id!);
                            }}
                          >
                            <FaTrash className="my-7 mx-3 text-red-600 hover:text-red-800 hover:delay-200 cursor-pointer" />
                          </button>
                        </div>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeHistory;
