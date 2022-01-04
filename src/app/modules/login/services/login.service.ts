import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { UserEnum } from 'src/environments/enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  userLogin = new Subject<SocialUser>();

  constructor(
    private http?: HttpClient,
    private cookieService?: CookieService,
    private socialAuthService?: SocialAuthService,
  ) {
    this.baseUrl = `${environment.timeTrackerApiUrl}/users`;
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.setLocalStorage('idToken', user.idToken);
        this.getUser(user.idToken).subscribe((response) => {
          this.setCookies();
          this.setLocalStorage('user2', JSON.stringify(response));
          this.userLogin.next(user);
        });
        setTimeout(this.socialAuthService.refreshAuthToken, 60 * 59 * 1000, GoogleLoginProvider.PROVIDER_ID);
      }
    });
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

  getSubjectUser() {
    return this.userLogin.asObservable();
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
