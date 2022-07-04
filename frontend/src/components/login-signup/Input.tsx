import React from "react";
export interface InputAttributes {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number | readonly string[] | undefined;
  labelText: string;
  labelFor: string;
  id: string | undefined;
  name: string;
  type: React.HTMLInputTypeAttribute | undefined;
  isRequired: boolean | undefined;
  fixedInputClass?: string;
  customClass?: string;
  placeholder: string | undefined;
}

const Input = (props: InputAttributes) => {
  const {
    handleChange,
    name,
    value,
    labelFor,
    labelText,
    id,
    type,
    isRequired,
    customClass,
    placeholder,
  } = props;

  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={fixedInputClass! + customClass}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
