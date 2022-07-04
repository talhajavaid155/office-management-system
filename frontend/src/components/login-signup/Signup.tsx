import React from "react";
import { useState } from "react";
import Input from "../login-signup/Input";
import FormAction from "./FormAction";
import { signupFields } from "../constants/formFields";
import axios from "axios";

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
  const createAccount = async () => {};

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
