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
    const token = this.loginService.getLocalStorage('user');
    if (this.isLegacyProduction) {
      const user = JSON.parse(token);
      const {groups = []} = user;
      return of(groups.includes(groupName));
    } else {
      const user = this.helper.decodeToken(token);
      const {groups = []} = user;
      if (groups.includes(groupName)) {
        return this.loginService.isValidToken(token);
      }
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
