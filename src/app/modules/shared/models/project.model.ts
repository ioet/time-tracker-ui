export interface Project {
  id?: string;
  customer_id?: string;
  customer_name?: string;
  name: string;
  description?: string;
  project_type_id?: string;
  search_field?: string;
  technologies?: string[];
  status?: any;
}

export interface ProjectUI {
  id?: string;
  customer_id?: string;
  customer_name?: string;
  name?: string;
  description?: string;
  project_type_id?: string;
  search_field?: string;
  technologies?: string[];
  status?: any;
  key?: string;
  btnColor?: string;
  btnIcon?: string;
  btnName?: string;
}
