import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Input from "../login-signup/Input";
import FormAction from "./FormAction";
import { signupFields } from "../constants/formFields";
import { EmployeeContext } from "../../context/EmployeeContext";
import { EmployeeContextType } from "../../interfaces/EmployeeInterface";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Api } from "../../api/Api";

const Signup = () => {
  const history = useHistory();
  const { userInfo } = useContext(EmployeeContext) as EmployeeContextType;

  const fields = signupFields;
  let fieldsState: any = {};

  fields.forEach((field) => (fieldsState[field.id] = ""));

  const [signupState, setSignupState] = useState(fieldsState);
  // console.log(
  //   "🚀 ~ file: Signup.tsx ~ line 23 ~ Signup ~ signupState",
  //   signupState
  // );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    Swal.fire({
      title: "User Created Updated Successfully",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
    console.log(signupState);
    createAccount();
    history.push({
      pathname: "/",
    });
  };
  useEffect(() => {
    // if user is logged in redirect the user to given path
    if (userInfo) {
      history.push({
        pathname: "/profile",
      });
    }
  }, [userInfo]);

  //handle Signup API Integration here
  const createAccount = async () => {
    await Api.post("/users/register", {
      firstName: signupState.firstName,
      lastName: signupState.lastName,
      Gender: signupState.gender,
      Address: signupState.address,
      DOB: signupState.dob,
      userName: signupState.userName,
      Password: signupState.password,
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
      });
    });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
};

export default Signup;
