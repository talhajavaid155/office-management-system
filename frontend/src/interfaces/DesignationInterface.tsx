export interface Designation {
  id?: number;
  designationName: string;
  designationGrade: string;
  designationSalary: string;
}

export type DesignationContextType = {
  designations?: Designation[];
  postDesignation?: (designation: Designation) => void;
  setDesignations?: React.Dispatch<React.SetStateAction<Designation[]>>;
  setShowTasks?: React.Dispatch<React.SetStateAction<boolean>>;
  showTasks?: boolean;
};
