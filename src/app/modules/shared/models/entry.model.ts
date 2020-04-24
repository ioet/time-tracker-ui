export interface Entry {
  id: string;
  project: string;
  startDate: string;
  endDate: string;
  activity: string;
  technologies: string[];
  comments?: string;
  ticket?: string;
}

export interface NewEntry {
  project_id: string;
  start_date: string;
}

export interface EntryRunning {
  project_id: string;
  start_date: string;
  activity_id: string;
  description: string;
  end_date: string;
  uri: string;
  technologies: string[];
  running: boolean;
  owner_id: string;
  id: string;
  tenant_id: string;
  deleted: string;
}
