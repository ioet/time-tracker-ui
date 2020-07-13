export interface Entry {
  running?: boolean;
  id: string;
  start_date: Date;
  end_date?: Date;
  activity_id?: string;
  technologies: string[];
  uri?: string;
  project_id?: string;
  owner_email?: string;
  description?: string;
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
