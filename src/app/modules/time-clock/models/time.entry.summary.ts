export interface TimeEntriesSummary {
  day: TimeDetails;
  week: TimeDetails;
  month: TimeDetails;
}

export interface TimeDetails {
  hours: string;
  minutes: string;
  seconds: string;
}
