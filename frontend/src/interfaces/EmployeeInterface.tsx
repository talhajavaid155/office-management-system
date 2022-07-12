import React from "react";

export interface IEmployeeData {
  id?: number;
  firstName?: string;
  lastName?: string;
  Gender?: string;
  Address?: string;
  DOB?: string;
  userName?: string;
  Password?: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  roleId?: number;
  roleName?: string;
  departmentId?: number;
  department?: {};
  projects?: [];
}

export interface IEmployeeInfo {
  id: string;
  firstName: string;
  lastName: string;
}

export type EmployeeContextType = {
  employees?: IEmployeeData[];
  // postEmployee?: (employee: Employee) => void;
  // updateEmployee?: (id: number) => void;
  // deleteEmployee?: (id: number) => void;
  setEmployees?: React.Dispatch<React.SetStateAction<IEmployeeData[]>>;
  setShowTasks?: React.Dispatch<React.SetStateAction<boolean>>;
  showTasks?: boolean;
  setUserInfo?: React.Dispatch<React.SetStateAction<any>>;
  userInfo?: any;
};
