import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Api } from "../../api/Api";
import { EmployeeContext } from "../../context/EmployeeContext";
import { EmployeeContextType } from "../../interfaces/EmployeeInterface";
import { loginFields } from "../constants/formFields";
import Input from "../login-signup/Input";
import FormAction from "./FormAction";

const Login = () => {
  const history = useHistory();

  const { userInfo, setUserInfo } = useContext(
    EmployeeContext
  ) as EmployeeContextType;

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

  useEffect(() => {
    if (userInfo?.roleName === "Admin") {
      history.push({
        pathname: "/employees",
      });
    } else if (userInfo) {
      history.push({
        pathname: "/profile",
        state: { user: userInfo },
      });
    }
  }, [userInfo, history]);

  //Handle Login API Integration here
  const loginUser = () => {
    Api.post("/users/login", {
      userName: loginState.userName,
      Password: loginState.password,
    })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(
            "🚀 ~ file: Login.tsx ~ line 38 ~ loginUser ~ response.data",
            response
          );
          setUserInfo!(response.data);
          console.log(
            "🚀 ~ file: Login.tsx ~ line 66 ~ loginUser ~ userInfo",
            userInfo
          );
          if (response.data.roleName === "Admin") {
            history.push({
              pathname: "/employees",
            });
          } else {
            history.push({
              pathname: "/profile",
              state: { user: response.data },
            });
          }
        }

        return response.data;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
        console.log(
          "🚀 ~ file: Login.tsx ~ line 96 ~ loginUser ~ error.response.data",
          error.response.data.error
        );
      });
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
    </form>
  );
};

export default Login;
