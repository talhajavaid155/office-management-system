export interface EmployeeHistory {
  id?: number;
  Resignation: string;
}

export type EmployeeHistoryContextType = {
  employeeHistory?: EmployeeHistory[];
  postEmployeeHistory?: (employeeHistory: EmployeeHistory) => void;
  deleteEmployeeHistory?: (id: number) => void;
  setemployeeHistory?: React.Dispatch<React.SetStateAction<EmployeeHistory[]>>;
  setShowTasks?: React.Dispatch<React.SetStateAction<boolean>>;
  showTasks?: boolean;
};
