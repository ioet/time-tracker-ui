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

  createEntry(entryData): Observable<any> {
    return this.http.post(this.baseUrl, entryData);
  }

  updateActiveEntry(entryData): Observable<any> {
    const { id } = entryData;
    return this.http.put(`${this.baseUrl}/${id}`, entryData);
  }

  stopEntryRunning(idEntry: string): Observable<any> {
    const url = `${this.baseUrl}/${idEntry}/stop`;
    return this.http.post(url, null);
  }
}
