import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GROUPS } from '../../../../environments/environment';

import { LoginService } from '../../login/services/login.service';


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private loginService: LoginService) {}

  isMemberOf(groupName: string): Observable<boolean> {
    const user = JSON.parse(this.loginService.getLocalStorage('user2'));
    const {groups = []} = user;
    return of(groups.includes(groupName));
  }

  isAdmin(): Observable<boolean> {
    return this.isMemberOf(GROUPS.ADMIN);
  }

  isTester(): Observable<boolean> {
    return this.isMemberOf(GROUPS.TESTER);
  }
}
