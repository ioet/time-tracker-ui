export interface User {
  name: string;
  email: string;
  roles?: string[];
  groups?: string[];
  id: string;
  tenant_id?: string;
  deleted?: string;
}

export interface UserState extends User {
  isLoading: boolean;
  error: string;
}
