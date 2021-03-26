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

<<<<<<< HEAD
<<<<<<< HEAD
  addUserToGroup(userId: string, group: string): Observable<User> {
=======
  addGroupToUser(userId: string, group: string): Observable<User> {
>>>>>>> feat: TT-188 add & remove groups to user service
=======
  addUserToGroup(userId: string, group: string): Observable<User> {
>>>>>>> refactor: TT-188 refactor some names
    return this.http.post<User>(`${this.baseUrl}/${userId}/groups/add`, {
      group_name: group,
    });
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  removeUserFromGroup(userId: string, group: string): Observable<User> {
=======
  removeGroupToUser(userId: string, group: string): Observable<User> {
>>>>>>> feat: TT-188 add & remove groups to user service
=======
  removeUserToGroup(userId: string, group: string): Observable<User> {
>>>>>>> refactor: TT-188 refactor some names
=======
  removeUserFromGroup(userId: string, group: string): Observable<User> {
>>>>>>> refactor: TT-188 refactor 'removeTo' to 'removeFrom'  references
    return this.http.post<User>(`${this.baseUrl}/${userId}/groups/remove`, {
      group_name: group,
    });
  }
}
