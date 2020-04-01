import { TestBed, inject } from '@angular/core/testing';
import { AzureAdB2CService } from './azure.ad.b2c.service';
import { UserAgentApplication, Account } from 'msal';

describe('AzureAdB2CService', () => {
  let service: AzureAdB2CService;
  const msalStub = {
    loginPopup() {
      return {};
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
    service = TestBed.inject(AzureAdB2CService);
  });

  it('should be created', inject([AzureAdB2CService],
    ( apiService: AzureAdB2CService) => {
      expect(apiService).toBeTruthy();
  }));

  it('on signIn should call msal loginPopup', () => {
    spyOn(UserAgentApplication.prototype, 'loginPopup').and.returnValue((
      new Promise((resolve) => {
          resolve();
      })
    ));
    service.signIn();
    expect(UserAgentApplication.prototype.loginPopup).toHaveBeenCalled();
  });

  it('on logout should call msal logout', () => {
    spyOn(UserAgentApplication.prototype, 'logout').and.returnValue();
    service.logout();
    expect(UserAgentApplication.prototype.logout).toHaveBeenCalled();
  });

  it('should get Account name from UserAgentApplication', () => {
    const account: Account = {
      accountIdentifier: 'abc',
      homeAccountIdentifier: 'abc',
      userName: 'abc',
      name: 'abc',
      idToken: {},
      idTokenClaims: {},
      sid: 'abc',
      environment: 'abc'
    };
    spyOn(UserAgentApplication.prototype, 'getAccount').and.returnValues(account);

    const name = service.getName();

    expect(UserAgentApplication.prototype.getAccount).toHaveBeenCalled();
    expect(name).toEqual(account.name);
  });

  it('isLogin returns true if UserAgentApplication has a defined Account', () => {
    const account: Account = {
      accountIdentifier: 'abc',
      homeAccountIdentifier: 'abc',
      userName: 'abc',
      name: 'abc',
      idToken: {},
      idTokenClaims: {},
      sid: 'abc',
      environment: 'abc'
    };
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

});
