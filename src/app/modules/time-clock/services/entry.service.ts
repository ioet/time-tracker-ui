import { TimeEntriesSummary } from '../models/time.entry.summary';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { EnvironmentType } from './../../../../environments/enum';
import { TimeEntriesTimeRange } from '../models/time-entries-time-range';
import { DatePipe } from '@angular/common';
import { Entry } from '../../shared/models';
import * as moment from 'moment';


interface QueryParams {
  start_date: string;
  end_date: string;
  user_id: string | string[];
  limit: string;
  timezone_offset: string;
  project_id?: string;
  activity_id?: string;
}

export const MAX_NUMBER_OF_ENTRIES_FOR_REPORTS = 9999;


@Injectable({
  providedIn: 'root',
})
export class EntryService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  static TIME_ENTRIES_DATE_TIME_FORMAT = 'yyyy-MM-ddTHH:mm:ssZZZZZ';
  baseUrl = `${environment.timeTrackerApiUrl}/time-entries`;
  urlInProductionLegacy = environment.production === EnvironmentType.TT_PROD_LEGACY;

  loadActiveEntry(): Observable<any> {
    return this.http.get(`${this.baseUrl}/running/`);
  }

  loadEntries(date): Observable<any> {
    const timezoneOffset = new Date().getTimezoneOffset();
    return this.http.get(`${this.baseUrl}/?month=${date.month}&year=${date.year}&timezone_offset=${timezoneOffset}`);
  }

  createEntry(entryData): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, entryData);
  }

  updateEntry(entryData): Observable<any> {
    const { id } = entryData;
    return this.http.put(`${this.baseUrl}/${id}`, entryData);
  }

  deleteEntry(entryId: string): Observable<any> {
    const url = `${this.baseUrl}/${entryId}`;
    return this.http.delete(url);
  }

  stopEntryRunning(idEntry: string): Observable<any> {
    return this.urlInProductionLegacy
      ? this.http.post(`${this.baseUrl}/${idEntry}/stop/`, null)
      : this.http.put(`${this.baseUrl}/stop/`, null);
  }

  restartEntry(idEntry: string): Observable<Entry> {
    const url = `${this.baseUrl}/${idEntry}/restart`;
    return this.http.post<Entry>(url, null);
  }

  summary(): Observable<TimeEntriesSummary> {
    const timeOffset = new Date().getTimezoneOffset();
    const summaryUrl = `${this.baseUrl}/summary/?time_offset=${timeOffset}`;
    return this.http.get<TimeEntriesSummary>(summaryUrl);
  }

  findEntriesByProjectId(projectId: string): Observable<Entry[]> {
    const startDate = this.getDateLastMonth();
    const endDate = this.getCurrentDate();
    const findEntriesByProjectURL = `${this.baseUrl}/?limit=2&project_id=${projectId}&start_date=${startDate}&end_date=${endDate}`;
    return this.http.get<Entry[]>(findEntriesByProjectURL);
  }


  loadEntriesByTimeRange(
    range: TimeEntriesTimeRange,
    userId: string[] | string,
    projectId?: string,
    activityId?: string
  ): Observable<any> {

    const loadEntriesByTimeRangeURL = this.urlInProductionLegacy ? this.baseUrl : this.baseUrl + '/report/';
    const queryParams: QueryParams = {
      start_date: this.datePipe.transform(range.start_date, EntryService.TIME_ENTRIES_DATE_TIME_FORMAT),
      end_date: this.datePipe.transform(range.end_date, EntryService.TIME_ENTRIES_DATE_TIME_FORMAT),
      user_id: userId,
      limit: `${MAX_NUMBER_OF_ENTRIES_FOR_REPORTS}`,
      timezone_offset: new Date().getTimezoneOffset().toString(),
    };
    if (projectId !== '*') {queryParams.project_id = projectId; }
    if (activityId !== '*') {queryParams.activity_id = activityId; }

    return this.http.get(loadEntriesByTimeRangeURL, {
      params: { ...queryParams },
    });
  }

  getDateLastMonth() {
    return moment().subtract(1, 'months').format();
  }

  getCurrentDate() {
    return moment().format();
  }
}
