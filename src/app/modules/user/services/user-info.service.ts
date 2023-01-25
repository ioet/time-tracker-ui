import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { EnvironmentType } from 'src/environments/enum';
import { environment, GROUPS } from '../../../../environments/environment';

import { LoginService } from '../../login/services/login.service';


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  helper: JwtHelperService;
  isLegacyProduction: boolean = environment.production === EnvironmentType.TT_PROD_LEGACY;

  constructor(private loginService: LoginService) {
    this.helper = new JwtHelperService();
  }

  isMemberOf(groupName: string): Observable<boolean> {
    const userCookie = this.loginService.fetchAndCheckUserPermissions();
    if (userCookie === 'timetracker-admin') {
      return of(true);
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
