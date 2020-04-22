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

  createEntry(entryData): Observable<any> {
    return this.http.post(this.baseUrl, entryData);
  }
}
