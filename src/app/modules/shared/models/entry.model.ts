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
