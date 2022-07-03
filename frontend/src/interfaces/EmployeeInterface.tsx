export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  Gender: string;
  Address: string;
  DOB: string;
  createdAt?: Date;
  updatedAt?: Date;
  employees?: String[];
  // setEmployees?: React.Dispatch<React.SetStateAction<Employee | undefined>>;
}

export type EmployeeContextType = {
  employees?: Employee[];
  postEmployee?: (employee: Employee) => void;
  updateEmployee?: (id: number) => void;
  deleteEmployee?: (id: number) => void;
  setEmployees?: React.Dispatch<React.SetStateAction<Employee[]>>;
  setShowTasks?: React.Dispatch<React.SetStateAction<boolean>>;
  showTasks?: boolean;
};
