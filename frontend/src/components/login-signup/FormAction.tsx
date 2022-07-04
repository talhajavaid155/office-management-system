import React from "react";

export interface ActionForm {
  type?: "Button";
  handleSubmit: React.FormEventHandler<HTMLButtonElement>;
  text?: string;
  action?: "submit";
}

enum Action {
  type = "Button",
}
const FormAction = (props: ActionForm) => {
  const { action, handleSubmit, text } = props;
  return (
    <>
      {Action.type === "Button" ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormAction;

// export default function FormAction({
//     handleSubmit,
//     type='Button',
//     action='submit',
//     text
// }){

// }
