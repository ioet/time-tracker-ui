import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { LoginGuard } from './login.guard';


describe('LoginGuard', () => {

  let loginGuard: LoginGuard;
  let azureAdB2CService: AzureAdB2CService;
  let cookieService: CookieService;
  const azureAdB2CServiceStub = {
    isLogin() {
      return true;
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub},
      ]
    });
    loginGuard = TestBed.inject(LoginGuard);
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(loginGuard).toBeTruthy();
  });

  it('can activate the route when user is logged-in && the token cookie exists', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(cookieService, 'check').and.returnValue(true);
    const canActivate = loginGuard.canActivate();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(cookieService.check).toHaveBeenCalled();
    expect(canActivate).toEqual(true);
  });

  it('can not active the route and is redirected to login if user is not logged-in', inject([Router],  (router: Router) => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(router, 'navigate').and.stub();
    const canActivate = loginGuard.canActivate();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(canActivate).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

});
