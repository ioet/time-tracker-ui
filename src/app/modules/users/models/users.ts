export interface User {
  name: string;
  email: string;
  role?: string;
  roles?: string[];
  id: string;
  tenant_id?: string;
  deleted?: string;
}
