import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { CLIENT_ID, AUTHORITY, SCOPES } from '../../../../environments/environment';
import { UserAgentApplication } from 'msal';

@Injectable({
  providedIn: 'root',
})
export class AzureAdB2CService {
  msalConfig = {
    auth: {
      clientId: CLIENT_ID,
      authority: AUTHORITY,
      validateAuthority: false,
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
    this.msal.logout();
  }

  getName(): string {
    return this.msal.getAccount().name;
  }

  isAdmin() {
    return this.msal.getAccount()?.idToken?.extension_role === 'time-tracker-admin';
  }

  isLogin() {
    return this.msal.getAccount() ? true : false;
  }

  setTenantId() {
    if (this.msal.getAccount() && this.msal.getAccount().idToken) {
      const pathArray = this.msal.getAccount().idToken.iss.split('/');
      const tenantId = pathArray[3];
      sessionStorage.setItem('tenant_id', tenantId);
    }
  }

  getTenantId(): string {
    return sessionStorage.getItem('tenant_id');
  }
  getBearerToken(): string {
    return sessionStorage.getItem('msal.idtoken');
  }
}
