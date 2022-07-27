import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { UserEnum } from 'src/environments/enum';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  helper: JwtHelperService;

  constructor(
    private http?: HttpClient,
    private cookieService?: CookieService,
    private socialAuthService?: SocialAuthService
  ) {
    this.baseUrl = `${environment.timeTrackerApiUrl}/users`;
    this.helper = new JwtHelperService();
  }

  signIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.socialAuthService.signOut();
    this.cookieService.deleteAll();
    localStorage.clear();
  }

  isLogin() {
    const token = this.getLocalStorage('user');
    return this.isValidToken(token);
  }

  getUserId(): string {
    const token = this.getLocalStorage('user');
    const user = this.helper.decodeToken(token);
    return user[UserEnum.ID];
  }

  getName(): string {
    const token = this.getLocalStorage('user');
    const user = this.helper.decodeToken(token);
    return user[UserEnum.NAME];
  }

  getUserEmail(): string {
    const token = this.getLocalStorage('user');
    const user = this.helper.decodeToken(token);
    return user[UserEnum.EMAIL];
  }

  getUserGroup(): string {
    const token = this.getLocalStorage('user');
    const user = this.helper.decodeToken(token);
    return user[UserEnum.GROUPS];
  }

  getBearerToken(): string {
    return this.getLocalStorage('idToken');
  }

  getUser(tokenString: string) {
    const body = {
      token: tokenString,
    };

    return this.http.post(`${this.baseUrl}/login`, body);
  }

  setCookies() {
    this.cookieService.set('idtoken', this.getLocalStorage('idToken'), 30);
  }

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  isValidToken(token: string) {
    const body = { token };
    return this.http.post(`${this.baseUrl}/validate-token`, body).pipe(
      map((response) => {
        const responseString = JSON.stringify(response);
        const responseJson = JSON.parse(responseString);
        if (responseJson.new_token) {
          this.setLocalStorage('user', responseJson.new_token);
        }
        return responseString !== '{}' && this.cookieService.check('idtoken') ? true : false;
      })
    );
  }

}
