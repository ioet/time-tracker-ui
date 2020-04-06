import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../../environments/environment';
import { Activity } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  baseUrl = `${environment.timeTrackerApiUrl}/activities`;

  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl);
  }

  deleteActivity(acitivityId: string) {
    const url = `${this.baseUrl}/${acitivityId}`;
    return this.http.delete<void>(url);
  }
}
