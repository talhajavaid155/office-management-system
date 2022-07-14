export interface Role {
  id?: number;
  roleName?: string;
}

export type RoleContextType = {
  roles?: Role[];
  setRoles?: React.Dispatch<React.SetStateAction<Role[]>>;
  setShowTasks?: React.Dispatch<React.SetStateAction<boolean>>;
  showTasks?: boolean;
};
