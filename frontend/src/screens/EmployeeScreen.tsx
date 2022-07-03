import { useContext } from "react";
import AddEmployee from "../components/employee/AddEmployee";
import Employees from "../components/employee/Employees";
import Button from "../ui/Button";
import { EmployeeContextType } from "../interfaces/EmployeeInterface";
import { EmployeeContext } from "../context/EmployeeContext";

const EmployeeScreen = () => {
  const { employees, setShowTasks, showTasks } = useContext(
    EmployeeContext
  ) as EmployeeContextType;
  // console.log(employees);
  // const [showTasks, setShowTasks] = useState(false);
  // const baseURL = "http://localhost:5000/employees";
  // const config = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // };

  // const postEmployee = (employee: any) => {
  //   Employee.post("", {
  //     firstName: employee.firstName,
  //     lastName: employee.lastName,
  //     Gender: employee.gender,
  //     Address: employee.address,
  //     DOB: employee.dob,
  //   }).then((response) => {
  //     // setEmployees([response.data, ...employees]);
  //     console.log(response.data);
  //   });
  // };

  // useEffect(() => {
  //   const empoloyeeData = async () => {
  //     try {
  //       const { data } = await Employee.get("?_limit=10");
  //       // console.log(data?.employees);
  //       setEmployees(data?.employees);
  //     } catch (error) {
  //       console.log("Error Message" + error);
  //     }
  //   };
  //   empoloyeeData();
  // }, []);
  // // console.log(employees);
  return (
    <>
      <Button
        color={showTasks ? "red" : "green"}
        text={showTasks ? "CLOSE" : "ADD"}
        onClick={() => {
          setShowTasks?.(!showTasks);
        }}
      />

      {/* {showTasks && <AddEmployee />} */}
      {employees && <Employees />}
    </>
  );
};

export default EmployeeScreen;
