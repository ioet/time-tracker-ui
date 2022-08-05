import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { from, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AUTHORITY, CLIENT_ID, SCOPES } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AzureAdB2CService {
  constructor(private cookieService?: CookieService) { }

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
    localStorage.removeItem('user');
  }

  getName(): string {
    return this.msal.getAccount().name;
  }

  // TODO: inused method
  isAdmin() {
    return this.msal.getAccount()?.idToken?.extension_role === 'time-tracker-admin';
  }

  isLogin() {
    return this.msal.getAccount() && this.cookieService.check('msal.idtoken') ? true : false;
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
}
