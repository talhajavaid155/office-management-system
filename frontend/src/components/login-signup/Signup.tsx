import React from "react";
import { useState } from "react";
import Input from "../login-signup/Input";
import FormAction from "./FormAction";
import { signupFields } from "../constants/formFields";
import axios from "axios";
import { EmployeeApi } from "../../api/Employee";

const Signup = () => {
  const fields = signupFields;
  let fieldsState: any = {
    // firstname: "",
    // lastname: " ",
    // address: "",
    // gender: "",
    // dob: "",
    // username: "",
    // password: "",
  };

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
    console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    EmployeeApi.post("/employees/register", {
      firstName: signupState.firstName,
      lastName: signupState.lastName,
      Gender: signupState.gender,
      Address: signupState.address,
      DOB: signupState.dob,
      userName: signupState.userName,
      Password: signupState.password,
    });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
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
