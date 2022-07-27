import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { from, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AUTHORITY, CLIENT_ID, SCOPES } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AzureAdB2CService {
  baseUrl: string;

  constructor(
    private cookieService?: CookieService,
    private http?: HttpClient
  ) {
    this.baseUrl = `${environment.timeTrackerApiUrl}/users`;
  }

  msalConfig: any = {
    auth: {
      clientId: CLIENT_ID,
      authority: AUTHORITY,
      validateAuthority: false,
    },
    cache: {
      cacheLocation: 'localStorage',
    },
  };

  tokenRequest = {
    scopes: SCOPES,
  };

  msal = new UserAgentApplication(this.msalConfig);

  signIn(): Observable<any> {
    return from(this.msal.loginPopup(this.tokenRequest));
  }

  logout() {
    this.cookieService.deleteAll();
    this.msal.logout();
    localStorage.clear();
  }

  getName(): string {
    return this.msal.getAccount().name;
  }

  // TODO: inused method
  isAdmin() {
    return this.msal.getAccount()?.idToken?.extension_role === 'time-tracker-admin';
  }

  isLogin() {
    const token = localStorage.getItem('user');
    return this.isValidToken(token);
  }

  setCookies() {
    this.cookieService.set('msal.idtoken', this.getBearerToken(), 30);
    this.cookieService.set('msal.client.info', this.getBearerClientInfo(), 30);
  }

  setTenantId() {
    if (this.msal.getAccount() && this.msal.getAccount().idToken) {
      const pathArray = this.msal.getAccount().idToken.iss.split('/');
      const tenantId = pathArray[3];
      localStorage.setItem('tenant_id', tenantId);
    }
  }

  getTenantId(): string {
    return localStorage.getItem('tenant_id');
  }

  getBearerClientInfo(): string {
    return localStorage.getItem('msal.client.info');
  }

  getBearerToken(): string {
    return localStorage.getItem('msal.idtoken');
  }

  getUserEmail(): string {
    return this.msal.getAccount().idToken?.emails[0];
  }

  getUserGroup(): string {
    return this.msal.getAccount().idToken?.extension_role;
  }

  getUserId(): string {
    return this.msal.getAccount().accountIdentifier;
  }

  isValidToken(token: string) {
    const body = { token };
    const observable = this.http.post(`${this.baseUrl}/validate-token`, body).pipe(
      map((response) => {
        const responseString = JSON.stringify(response);
        const responseJson = JSON.parse(responseString);
        if (responseJson.new_token) {
          localStorage.setItem('user', responseJson.new_token);
        }
        const isValid = responseString !== '{}' && this.msal.getAccount() && this.cookieService.check('msal.idtoken');
        return isValid ? true : false;
      })
    );
    return observable;
  }
}
