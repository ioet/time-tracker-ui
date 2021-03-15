import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  baseUrl = `${environment.timeTrackerApiUrl}/users`;

  loadUser(userId): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

}
