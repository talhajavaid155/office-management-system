import React, { createContext, useState } from "react";
import { Employee, EmployeeContextType } from "../interfaces/EmployeeInterface";

export const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const EmployeeProivder = (props: any) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showTasks, setShowTasks] = useState<boolean>(true);

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user") + " " ?? {})
  );
  console.log(
    "🚀 ~ file: EmployeeContext.tsx ~ line 12 ~ EmployeeProivder ~ userInfo",
    userInfo
  );

  // console.log(employees);
  // setShowTasks(true);
  // useEffect(() => {
  //   const empoloyeeData = async () => {
  //     try {
  //       const { data } = await EmployeeApi.get("?_limit=10");
  //       // console.log(data?.employees);
  //       setShowTasks(data?.employees);
  //     } catch (error) {
  //       console.log("Error Message" + error);
  //     }
  //   };
  //   empoloyeeData();
  // }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        showTasks,
        setShowTasks,
        setUserInfo,
        userInfo,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};
