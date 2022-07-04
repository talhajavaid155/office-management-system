import { useState } from "react";
import { loginFields } from "../constants/formFields";
import Input from "../login-signup/Input";
import FormAction from "./FormAction";

const Login = () => {
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
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {};

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
