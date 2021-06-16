export interface Entry {
  running?: boolean;
  id?: string;
  start_date?: Date;
  end_date?: Date;
  activity_id?: string;
  technologies?: string[];
  uri?: string;
  activity_name?: string;
  description?: string;
  owner_email?: string;

  project_id?: string;
  project_name?: string;

  customer_id?: string;
  customer_name?: string;
}

export interface NewEntry {
  project_id: string;
  start_date?: string;
  description?: string;
  technologies?: string[];
  uri?: string;
  activity_id?: string;
  timezone_offset?: number;
}
