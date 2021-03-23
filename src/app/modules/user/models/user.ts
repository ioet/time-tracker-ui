export interface User {
  name: string;
  email: string;
  roles?: string[];
  groups?: string[];
  id: string;
  tenant_id?: string;
  deleted?: string;
}
