export interface Project {
  id?: string;
  customer_id?: string;
  customer_name?: string;
  name: string;
  description?: string;
  project_type_id?: string;
  search_field?: string;
  status?: any;
  technologies?: string[];
}

export interface ProjectUI {
  id?: string;
  customer_id?: string;
  customer_name?: string;
  name?: string;
  description?: string;
  project_type_id?: string;
  search_field?: string;
  status?: any;
  technologies?: string[];
  key?: string;
  btnColor?: string;
  btnIcon?: string;
  btnName?: string;
}
