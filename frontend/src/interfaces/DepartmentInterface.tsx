export interface Department {
  id?: number;
  departmentName: string;
}

export type DepartmentContextType = {
  departments?: Department[];
  postDepartment?: (department: Department) => void;
  deleteDepartment?: (id: number) => void;
  setDepartments?: React.Dispatch<React.SetStateAction<Department[]>>;
  setShowTasks?: React.Dispatch<React.SetStateAction<boolean>>;
  showTasks?: boolean;
};
