import { TestBed, inject } from '@angular/core/testing';
import { AzureAdB2CService } from './azure.ad.b2c.service';
import { UserAgentApplication, Account } from 'msal';

describe('AzureAdB2CService', () => {
  let service: AzureAdB2CService;

  const account: Account = {
    accountIdentifier: 'abc',
    homeAccountIdentifier: 'abc',
    userName: 'abc',
    name: 'abc',
    idToken: {
      iss: ' http://hostname.com/12345/v0/',
    },
    idTokenClaims: {},
    sid: 'abc',
    environment: 'abc',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
    });
    service = TestBed.inject(AzureAdB2CService);
  });

  it('should be created', inject([AzureAdB2CService], (apiService: AzureAdB2CService) => {
    expect(apiService).toBeTruthy();
  }));

  it('on signIn should call msal loginPopup', () => {
    spyOn(UserAgentApplication.prototype, 'loginPopup').and.returnValue(
      new Promise((resolve) => {
        resolve();
      })
    );
    service.signIn();
    expect(UserAgentApplication.prototype.loginPopup).toHaveBeenCalled();
  });

  it('on logout should call msal logout', () => {
    spyOn(UserAgentApplication.prototype, 'logout').and.returnValue();
    service.logout();
    expect(UserAgentApplication.prototype.logout).toHaveBeenCalled();
  });

  it('should get Account name from UserAgentApplication', () => {
    spyOn(UserAgentApplication.prototype, 'getAccount').and.returnValues(account);

    const name = service.getName();

    expect(UserAgentApplication.prototype.getAccount).toHaveBeenCalled();
    expect(name).toEqual(account.name);
  });

  it('isLogin returns true if UserAgentApplication has a defined Account', () => {
    spyOn(UserAgentApplication.prototype, 'getAccount').and.returnValue(account);

    const isLogin = service.isLogin();

    expect(UserAgentApplication.prototype.getAccount).toHaveBeenCalled();
    expect(isLogin).toEqual(true);
  });

  it('isLogin returns false if UserAgentApplication has a null value for Account', () => {
    spyOn(UserAgentApplication.prototype, 'getAccount').and.returnValue(null);
    const isLogin = service.isLogin();
    expect(UserAgentApplication.prototype.getAccount).toHaveBeenCalled();
    expect(isLogin).toEqual(false);
  });

  it('setTenantId should save a tenantId in session storage', () => {
    spyOn(UserAgentApplication.prototype, 'getAccount').and.returnValue(account);
    spyOn(sessionStorage, 'setItem').withArgs('tenant_id', '12345');

    const isLogin = service.isLogin();
    service.setTenantId();

    expect(UserAgentApplication.prototype.getAccount).toHaveBeenCalled();
    expect(isLogin).toEqual(true);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('tenant_id', '12345');
  });

  it('setTenantId should not save tenantId if login is false ', () => {
    spyOn(UserAgentApplication.prototype, 'getAccount').and.returnValue(null);
    spyOn(sessionStorage, 'setItem');
    const isLogin = service.isLogin();
    expect(UserAgentApplication.prototype.getAccount).toHaveBeenCalled();
    expect(isLogin).toEqual(false);
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
  });

  it('getTenantId should get the tenantId from session storage', () => {
    const tenantId = '12345';
    spyOn(sessionStorage, 'getItem').and.returnValue(tenantId);

    const resp = service.getTenantId();

    expect(sessionStorage.getItem).toHaveBeenCalled();
    expect(resp).toEqual(tenantId);
  });

  it('getBearerToken should get the bearer token from session storage', () => {
    const token = '12345abc';
    spyOn(sessionStorage, 'getItem').and.returnValue(token);

    const resp = service.getBearerToken();

    expect(sessionStorage.getItem).toHaveBeenCalled();
    expect(resp).toEqual(token);
  });
});
