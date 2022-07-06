import { useContext, useState } from "react";
import { EmployeeApi } from "../../api/Employee";
import { EmployeeContext } from "../../context/EmployeeContext";
import { EmployeeContextType } from "../../interfaces/EmployeeInterface";

// interface ChildProps {
//     postEmployee: (employee) => void;
//   }
const AddEmployee = (props: any) => {
  const { setShowTasks, showTasks } = useContext(
    EmployeeContext
  ) as EmployeeContextType;
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDOB] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();

    EmployeeApi.post("", {
      firstName: firstName,
      lastName: lastName,
      Gender: gender,
      Address: address,
      DOB: dob,
    }).then((response) => {
      console.log(response.data);
    });
    setfirstName("");
    setlastName("");
    setGender("");
    setAddress("");
    setDOB("");
    setShowTasks?.(!showTasks);
    // props.history.push("/");
  };
  return (
    <form className="w-4/5 p-7" onSubmit={onSubmit}>
      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="firstName"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => setfirstName(e.target.value)}
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="lastName"
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => setlastName(e.target.value)}
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last name
          </label>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="Gender"
            id="floating_gender"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => setGender(e.target.value)}
          />
          <label
            htmlFor="Gender"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Gender
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="Address"
            id="floating_address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <label
            htmlFor="Address"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address
          </label>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="date"
            name="DOB"
            id="floating_dob"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => setDOB(e.target.value)}
          />
          <label
            htmlFor="DOB"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            DOB
          </label>
        </div>
        {/* <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_company"
            id="floating_company"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_company"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company (Ex. Google)
          </label>
        </div> */}
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add
      </button>
      <button
        type="button"
        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-5"
        // onClick={()=>{clea}}
      >
        Clear
      </button>
    </form>
  );
};

export default AddEmployee;
