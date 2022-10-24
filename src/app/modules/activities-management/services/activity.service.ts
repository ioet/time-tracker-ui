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

  createActivity(activityData): Observable<any> {
    const body = {
      ...activityData,
      tenant_id: '4225ab1e-1033-4a5f-8650-0dd4950f38c8',
    };

    return this.http.post(this.baseUrl, body);
  }

  deleteActivity(acitivityId: string): Observable<any> {
    const url = `${this.baseUrl}/${acitivityId}`;
    return this.http.delete(url);
  }

  updateActivity(activityData): Observable<any> {
    const url = `${this.baseUrl}/${activityData.id}`;

    const body = {
      ...activityData,
    };

    return this.http.put(url, body);
  }
}
