import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentType, UserEnum } from 'src/environments/enum';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  helper: JwtHelperService;
  isLegacyProd: boolean = environment.production === EnvironmentType.TT_PROD_LEGACY;
  localStorageKey = this.isLegacyProd ? 'user2' : 'user';


  //get all of users from DB
  constructor(
    private http?: HttpClient,
    private cookieService?: CookieService,
  ) {
    this.baseUrl = `${environment.timeTrackerApiUrl}/users`;
    this.helper = new JwtHelperService();
  }

  getUserPermissions = async () => {
    try {
      const response = this.http.get(`${this.baseUrl}/users/validate/token`);
      return response?.status === 200 ? response?.data : null;
    } catch (error) {
      return null;
    }
  }

  logout() {
    this.cookieService.deleteAll();
    localStorage.clear();
  }

  fetchAndCheckUserPermissions() {
    const cookiesAuth = this.getUserPermissions();
    if(cookiesAuth.getRole() ==  'timetracker-admin' && cookiesAuth.getUserGroup() == 'timetracker-admin'){
      return cookiesAuth.getRole();
    }
    sessionStorage.clear();

  }

}
