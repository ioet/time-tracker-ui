export interface Entry {
  id: string;
  project: string;
  startDate: string;
  endDate: string;
  activity: string;
  technologies: string[];
  comments?: string;
  uri?: string;
}

export interface NewEntry {
  project_id: string;
  start_date?: string;
  description?: string;
  technologies?: string[];
  uri?: string;
}
