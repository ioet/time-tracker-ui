import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { environment } from './../../../../environments/environment';
import { EnvironmentType } from './../../../../environments/enum';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isProductionLegacy = environment.production === EnvironmentType.TT_PROD_LEGACY;
  constructor(private http: HttpClient) {}

  baseUrl = `${environment.timeTrackerApiUrl}/users`;

  loadUsers(): Observable<any> {
    return this.http.get(this.baseUrl, { withCredentials: true });
  }

  grantRole(userId: string, roleId: string): Observable<any> {
    const url = this.isProductionLegacy ? `${this.baseUrl}/${userId}/roles/${roleId}/grant`
    : `${this.baseUrl}/${userId}/${roleId}/grant`;
    return this.http.post(url, null, { withCredentials: true });
  }

  revokeRole(userId: string, roleId: string): Observable<any> {
    const url = this.isProductionLegacy ? `${this.baseUrl}/${userId}/roles/${roleId}/revoke`
    : `${this.baseUrl}/${userId}/${roleId}/revoke`;
    return this.http.post(url, null, { withCredentials: true });
  }

  addUserToGroup(userId: string, group: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userId}/groups/add`, {
      group_name: group,
    }, { withCredentials: true });
  }

  removeUserFromGroup(userId: string, group: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userId}/groups/remove`, {
      group_name: group,
    }, { withCredentials: true });
  }
}
