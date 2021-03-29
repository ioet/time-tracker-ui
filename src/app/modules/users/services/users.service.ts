import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  baseUrl = `${environment.timeTrackerApiUrl}/users`;

  loadUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  grantRole(userId: string, roleId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/roles/${roleId}/grant`;
    return this.http.post(url, null);
  }

  revokeRole(userId: string, roleId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/roles/${roleId}/revoke`;
    return this.http.post(url, null);
  }

  addUserToGroup(userId: string, group: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userId}/groups/add`, {
      group_name: group,
    });
  }

  removeUserFromGroup(userId: string, group: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userId}/groups/remove`, {
      group_name: group,
    });
  }
}
