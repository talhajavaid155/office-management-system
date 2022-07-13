import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { DesignationContext } from "../../context/DesignationContext";
import { DesignationContextType } from "../../interfaces/DesignationInterface";
import _ from "lodash";
import { Api } from "../../api/Api";
const AddDesignation = () => {
  const { designations, setDesignations, setShowTasks, showTasks } = useContext(
    DesignationContext
  ) as DesignationContextType;

  useEffect(() => {
    const designationData = async () => {
      try {
        const { data } = await Api.get("/designation");
        console.log("designation ", data);
        setDesignations?.(data?.designation);
      } catch (error) {
        console.log("Error Message" + error);
      }
    };
    designationData();
  }, [showTasks]);
  console.log("designation ", designations);

  const [designationName, setdesignationName] = useState("");
  const [designationGrade, setdesignationGrade] = useState("");
  const [designationSalary, setdesignationSalary] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();

    Api.post("/designation", {
      designationName: designationName,
      designationGrade: designationGrade,
      designationSalary: designationSalary,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    setShowTasks?.(!showTasks);
  };

  const deleteDesignationHandler = (id: number) => {
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
        Api.delete(`/designation/${id}`);
        setDesignations?.(
          designations!.filter((designation) => {
            return designation.id !== id;
          })
        );
        Swal.fire("Deleted!", "Desigantion has been deleted.", "success");
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
              name="designationName"
              id="floating_designation_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setdesignationName(e.target.value)}
            />
            <label
              htmlFor="floating_designation_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Designation name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="designationGrade"
              id="floating_designation_grade"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setdesignationGrade(e.target.value)}
            />
            <label
              htmlFor="floating_designation_grade"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Designation Grade
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="designationSalary"
              id="floating_designation_salary"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setdesignationSalary(e.target.value)}
            />
            <label
              htmlFor="floating_designation_salary"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Salary
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
                        Designation Name
                      </th>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        Designation Grade
                      </th>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        Designation Grade Salary
                      </th>
                      <th className="p-3 text-sm font-semibold tracking wide text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {_.map(designations, (designation, key) => {
                    return (
                      <tr key={key}>
                        <td className="p-3 text-sm whitespace-nowrap">
                          {designation.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {designation.designationName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {designation.designationGrade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {designation.designationSalary}
                        </td>
                        <div className="flex">
                          <button
                            onClick={() => {
                              deleteDesignationHandler(designation.id!);
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

export default AddDesignation;
