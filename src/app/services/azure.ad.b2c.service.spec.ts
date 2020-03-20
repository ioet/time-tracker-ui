import { TestBed, inject } from '@angular/core/testing';
import { AzureAdB2CService } from './azure.ad.b2c.service';
import { of } from 'rxjs';
import { UserAgentApplication } from 'msal';

describe('AzureAdB2CService', () => {
  let service: AzureAdB2CService;
  const msalStub = {
    loginPopup() {
      return {}
    }
  }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
    service = TestBed.inject(AzureAdB2CService);
  });

  it('should create', inject([AzureAdB2CService],
    ( apiService: AzureAdB2CService) => {
      expect(apiService).toBeTruthy();
  }));

  it('should call msal loginPopup', () => {
    spyOn(UserAgentApplication.prototype, 'loginPopup').and.returnValue((
      new Promise((resolve) => {
          resolve();
      })
    ))
    service.signIn()
    expect(UserAgentApplication.prototype.loginPopup).toHaveBeenCalled;
  });

  it('should call msal logout', () => {
    spyOn(UserAgentApplication.prototype, 'logout').and.returnValue()
    service.logout()
    expect(UserAgentApplication.prototype.logout).toHaveBeenCalled;
  });

  it('should call msal logout', () => {
    spyOn(UserAgentApplication.prototype, 'getAccount').and.callFake
    service.isLogin()
    expect(UserAgentApplication.prototype.getAccount).toHaveBeenCalled;
  });

});