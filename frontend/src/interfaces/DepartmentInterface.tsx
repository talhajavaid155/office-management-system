import { IEmployeeData } from "./EmployeeInterface";

export interface Department {
  id?: number;
  departmentName: string;
  createdAt?: Date;
  updatedAt?: Date;
  employees?: IEmployeeData[];
}

export type DepartmentContextType = {
  departments?: Department[];
  setDepartments?: React.Dispatch<React.SetStateAction<Department[]>>;
  setShowTasks?: React.Dispatch<React.SetStateAction<boolean>>;
  showTasks?: boolean;
};
