import { TimeEntriesSummary } from '../models/time.entry.summary';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  baseUrl = `${environment.timeTrackerApiUrl}/time-entries`;

  constructor(private http: HttpClient) {}

  loadActiveEntry(): Observable<any> {
    return this.http.get(`${this.baseUrl}/running`);
  }

  loadEntries(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createEntry(entryData): Observable<any> {
    return this.http.post(this.baseUrl, entryData);
  }

  updateActiveEntry(entryData): Observable<any> {
    const { id } = entryData;
    return this.http.put(`${this.baseUrl}/${id}`, entryData);
  }

  deleteEntry(entryId: string): Observable<any> {
    const url = `${this.baseUrl}/${entryId}`;
    return this.http.delete(url);
  }

  stopEntryRunning(idEntry: string): Observable<any> {
    const url = `${this.baseUrl}/${idEntry}/stop`;
    return this.http.post(url, null);
  }

  summary(): Observable<TimeEntriesSummary> {
    const summaryUrl = `${this.baseUrl}/summary`;
    return this.http.get<TimeEntriesSummary>(summaryUrl);
  }

}
