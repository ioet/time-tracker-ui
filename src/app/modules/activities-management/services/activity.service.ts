import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url = 'assets/activities.json';

  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.url);
  }
}
