import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Api } from "../api/Api";
import { EmployeeContext } from "../context/EmployeeContext";
import {
  EmployeeContextType,
  IEmployeeData,
} from "../interfaces/EmployeeInterface";
const ProfileScreen = ({ location }: any) => {
  const { userInfo, setUserInfo } = useContext(
    EmployeeContext
  ) as EmployeeContextType;
  const { id } = location.state.user;
  const [formData, setFormData] = useState<IEmployeeData>();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.accessToken}`,
    },
  };
  console.log(
    "🚀 ~ file: ProfileScreen.tsx ~ line 11 ~ ProfileScreen ~ userInfo",
    userInfo
  );

  console.log(
    "🚀 ~ file: ProfileScreen.tsx ~ line 21 ~ ProfileScreen ~ config",
    config
  );

  useEffect(() => {
    const empoloyeeData = async () => {
      try {
        const { data } = await Api.get(`/users/${id}`, config);

        setFormData(data);
      } catch (error) {
        console.log("Error Message" + error);
      }
    };
    empoloyeeData();
  }, [userInfo]);

  console.log(
    "🚀 ~ file: ProfileScreen.tsx ~ line 166 ~ ProfileScreen ~ formData",
    formData
  );

  const updateEmployeeHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await Api.put(
        `/users/${formData?.id}`,
        formData,
        config
      );
      localStorage.setItem(
        "user",
        JSON.stringify(formData, userInfo.accessToken)
      );
      Swal.fire({
        title: "Form Updated Successfully",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const logOutUser = () => {
    localStorage.removeItem("user");
    setUserInfo!(null);
    document.location.href = "/";
  };
  return (
    <div>
      <div className="flex py-7 justify-between w-9/12 ">
        <h1 className="px-7 py-3">User Profile</h1>
        <button
          type="submit"
          onClick={logOutUser}
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  sm:w-auto px-4 py-2 text-center"
        >
          Log Out
        </button>
      </div>
      <div className="flex w-full ">
        <div className="w-96">
          <form className="lg:min-w-full p-7 " onSubmit={updateEmployeeHandler}>
            <div className="flex flex-col">
              <div className="relative z-0 w-full mb-6 mt-3 group">
                <input
                  type="text"
                  name="firstName"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={formData?.firstName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="floating_first_name"
                  className=" absolute text-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-90 top-3 -z-10 origin-[0] peer-focus:left-1  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="lastName"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={formData?.lastName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="floating_last_name"
                  className=" absolute text-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-90 top-3 -z-10 origin-[0] peer-focus:left-1  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 mt-3 group">
                <input
                  type="text"
                  name="Address"
                  id="floating_address"
                  className="block py-2.5 px-0 w-full text-medium text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={formData?.Address}
                  onChange={handleChange}
                />
                <label
                  htmlFor="Address"
                  className="peer-focus:font-medium absolute text-medium text-gray-500  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <h1>Current Department:</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
