import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { GROUPS } from '../../../../environments/environment';

import { LoginService } from '../../login/services/login.service';


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  helper: JwtHelperService;

  constructor(private loginService: LoginService) {
    this.helper = new JwtHelperService();
  }

  isMemberOf(groupName: string): Observable<boolean> {
    const token = this.loginService.getLocalStorage('user');
    const user = this.helper.decodeToken(token);
    const {groups = []} = user;
    if (groups.includes(groupName)) {
      return this.loginService.isValidToken(token);
    }
    return of(false);
  }

  isAdmin(): Observable<boolean> {
    return this.isMemberOf(GROUPS.ADMIN);
  }

  isTester(): Observable<boolean> {
    return this.isMemberOf(GROUPS.TESTER);
  }


}
