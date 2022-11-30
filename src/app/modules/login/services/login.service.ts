import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentType, UserEnum } from 'src/environments/enum';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  helper: JwtHelperService;
  isLegacyProd: boolean = environment.production === EnvironmentType.TT_PROD_LEGACY;
  localStorageKey = this.isLegacyProd ? 'user2' : 'user';
  ngZone?: NgZone;


  constructor(
    private http?: HttpClient,
    private cookieService?: CookieService,
    private router?: Router,
    @Inject('decrypt') private decrypt?: any,
    @Inject(REQUEST) private request?: Request
  ) {
    this.baseUrl = `${environment.timeTrackerApiUrl}/users`;
    this.helper = new JwtHelperService();
    this.router = router;
  }

  private getCookie(name: string): string {
    const cookies = {};
    if (this.request.headers['cookie']) {
      const decoded = decodeURIComponent(
        this.request.headers['cookie']
      );
      decoded.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        cookies[parts[0].trim()] = (parts[1] || '').trim();
      });
    }
    return cookies[name];
  }

  logout() {
    localStorage.clear();
    this.cookieService.deleteAll();
    this.invalidateSessionCookie().toPromise().then(() => {
      this.router.navigate(['login']);
    });
  }

  invalidateSessionCookie() {
    return this.http.post(`${this.baseUrl}/logout`, null, { withCredentials: true });
  }

  // isLogin() {
  //   const token = this.getLocalStorage(this.localStorageKey);
  //   if (this.isLegacyProd) {
  //     const user = JSON.parse(token);
  //     return user && this.cookieService.check('idtoken') ? of(true) : of(false);
  //   } else {
  //     return token ? of(true) : of(false);
  //   }
  // }
  isLogin() {
    const token = this.getLocalStorage(this.localStorageKey);
    return of(Boolean(token))
  }

  checkCookieSession(): Observable<any> {
    const token = this.cookieService.get('session');
    console.log("check", this.cookieService.check('session'))
    console.log(token);
    const loggedInCookie = this.getCookie('session');
    console.log(loggedInCookie);
    console.log('decrypt', this.decrypt);
    return of(Boolean(token))
  }

  establishLocalAuth(): Observable<any> {
    return this.getUser(null).pipe(
      map(response => {
        this.setCookies();
        const strResponse = JSON.stringify(response);
        const user = JSON.parse(strResponse);
        this.setLocalStorage('user', user.token);
      })
    )
  }

  getUserId(): string {
    const token = this.getLocalStorage(this.localStorageKey);
    let user;
    if (this.isLegacyProd) {
      user = JSON.parse(token);
    } else {
      user = this.helper.decodeToken(token);
    }
    return user[UserEnum.ID];
  }

  getName(): string {
    const token = this.getLocalStorage(this.localStorageKey);
    let user;
    if (this.isLegacyProd) {
      user = JSON.parse(token);
    } else {
      user = this.helper.decodeToken(token);
    }
    return user[UserEnum.NAME];
  }

  getUserEmail(): string {
    const token = this.getLocalStorage(this.localStorageKey);
    let user;
    if (this.isLegacyProd) {
      user = JSON.parse(token);
    } else {
      user = this.helper.decodeToken(token);
    }
    return user[UserEnum.EMAIL];
  }

  getUserGroup(): string {
    const token = this.getLocalStorage(this.localStorageKey);
    let user;
    if (this.isLegacyProd) {
      user = JSON.parse(token);
    } else {
      user = this.helper.decodeToken(token);
    }
    return user[UserEnum.GROUPS];
  }

  getBearerToken(): string {
    return this.getLocalStorage('idToken');
  }

  getUser(tokenString: string) {
    const body = {
      token: tokenString,
    };

    return this.http.post(`${this.baseUrl}/login`, body, { withCredentials: true });
  }

  setCookies() {
    this.cookieService.set('idtoken', this.cookieService.get('session'), 30);
  }

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  isValidToken(token: string) {
    const body = { token };
    return this.http.post(`${this.baseUrl}/validate-token`, body, { withCredentials: true }).pipe(
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
