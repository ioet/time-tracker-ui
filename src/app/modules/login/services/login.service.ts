import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { UserEnum } from 'src/environments/enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string;

  constructor(
    private http?: HttpClient,
    private cookieService?: CookieService,
    private socialAuthService?: SocialAuthService
  ) {
    this.baseUrl = `${environment.timeTrackerApiUrl}/users`;
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
    const user = JSON.parse(this.getLocalStorage('user2'));
    return user && this.cookieService.check('idtoken') ? true : false;
  }

  getUserId(): string {
    const user = JSON.parse(this.getLocalStorage('user2'));
    return user[UserEnum.ID];
  }

  getName(): string {
    const user = JSON.parse(this.getLocalStorage('user2'));
    return user[UserEnum.NAME];
  }

  getUserEmail(): string {
    const user = JSON.parse(this.getLocalStorage('user2'));
    return user[UserEnum.EMAIL];
  }

  getUserGroup(): string {
    const user = JSON.parse(this.getLocalStorage('user2'));
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
}
