// import { EmployeeContextType } from "../interfaces/EmployeeInterface";
const Button = (props) => {
  // const { showTasks } = useContext(EmployeeContext);
  const { color, text, onClick } = props;

  return (
    <>
      {/* {showTasks && <h1>I am BUtton</h1>} */}
      <button
        style={{ backgroundColor: color }}
        className="text-white font-bold py-2 px-4 rounded m-7"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
