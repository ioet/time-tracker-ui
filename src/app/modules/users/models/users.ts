export interface User {
  name: string;
  email: string;
  roles?: string[];
  id: string;
  tenant_id?: string;
  deleted?: string;
}
