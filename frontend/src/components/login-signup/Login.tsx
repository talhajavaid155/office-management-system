import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { EmployeeApi } from "../../api/Employee";
import { EmployeeContext } from "../../context/EmployeeContext";
import { EmployeeContextType } from "../../interfaces/EmployeeInterface";
import { loginFields } from "../constants/formFields";
import Input from "../login-signup/Input";
import FormAction from "./FormAction";

const Login = () => {
  const history = useHistory();
  console.log("🚀 ~ file: Login.tsx ~ line 12 ~ Login ~ history", history);

  const { userInfo } = useContext(EmployeeContext) as EmployeeContextType;

  console.log("🚀 ~ file: Login.tsx ~ line 12 ~ Login ~ userInfo", userInfo);

  const fields = loginFields;
  let fieldsState: any = {};

  fields.forEach((field) => (fieldsState[field.id] = ""));

  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    loginUser();
  };

  //Handle Login API Integration here
  const loginUser = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    EmployeeApi.post("/employees/login", {
      userName: loginState.userName,
      Password: loginState.password,
    }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(
          "🚀 ~ file: Login.tsx ~ line 38 ~ loginUser ~ response.data",
          response
        );
        history.push({
          pathname: "/employees",
        });
      }

      return response.data;
    });
  };
  const logOutUser = () => {
    localStorage.removeItem("user");
    console.log("i am touched");
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormAction handleSubmit={handleSubmit} text="Login" />
      {/* <button  onClick={logOutUser}>Logout</button> */}
    </form>
  );
};

export default Login;
