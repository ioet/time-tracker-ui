import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { LoginGuard } from './login.guard';
import { LoginService } from '../../modules/login/services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialAuthService } from 'angularx-social-login';
import { of } from 'rxjs';


describe('LoginGuard', () => {

  let loginGuard: LoginGuard;
  let azureAdB2CService: AzureAdB2CService;
  const azureAdB2CServiceStub = {
    isLogin() {
      return of(true);
    }
  };
  let loginService: LoginService;
  const loginServiceStub = {
    isLogin() {
      return of(true);
    }
  };
  const socialAuthServiceStub = jasmine.createSpyObj('SocialAuthService', ['']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub},
        { providers: LoginService, useValue: loginServiceStub},
        { provide: SocialAuthService, useValue: socialAuthServiceStub }
      ]
    });
    loginGuard = TestBed.inject(LoginGuard);
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
    loginService = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(loginGuard).toBeTruthy();
  });

  it('can activate the route when user is logged-in on Production', () => {
    loginGuard.isProduction = true;
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(of(true));
    loginGuard.canActivate().subscribe(isLogin => {
      expect(isLogin).toEqual(true);
    });
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
  });

  it('can activate the route when user is logged-in Locally', () => {
    loginGuard.isProduction = false;
    spyOn(loginService, 'isLogin').and.returnValue(of(true));
    loginGuard.canActivate().subscribe(isLogin => {
      expect(isLogin).toEqual(true);
    });
    expect(loginService.isLogin).toHaveBeenCalled();
  });

  it('can not active the route and is redirected to login if user is not logged-in on Production', inject([Router],  (router: Router) => {
    loginGuard.isProduction = true;
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(of(false));
    spyOn(router, 'navigate').and.stub();
    loginGuard.canActivate().subscribe(isLogin => {
      expect(isLogin).toEqual(false);
    });
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('can not active the route and is redirected to login if user is not logged-in Locally', inject([Router],  (router: Router) => {
    loginGuard.isProduction = false;
    spyOn(loginService, 'isLogin').and.returnValue(of(false));
    spyOn(router, 'navigate').and.stub();
    loginGuard.canActivate().subscribe(isLogin => {
      expect(isLogin).toEqual(false);
    });
    expect(loginService.isLogin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

});
