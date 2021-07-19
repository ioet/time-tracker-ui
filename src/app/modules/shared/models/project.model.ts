import { Customer } from '../models';
export interface Project {
  id?: string;
  customer_id?: string;
  customer?: Customer;
  name: string;
  description?: string;
  project_type_id?: string;
  search_field?: string;
  status?: any;
}
export interface ProjectUI {
  id: string;
  name: string;
  description: string;
  tenant_id?: string;
  status?: string;
  key: string;
  _status: boolean;
  btnColor?: string;
  btnIcon: string;
  btnIconTwo: string;
  btnName: string;
  iconColor: string;
}
