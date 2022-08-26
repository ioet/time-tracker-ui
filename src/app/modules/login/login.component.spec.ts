import { waitForAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FeatureToggleCookiesService } from '../shared/feature-toggles/feature-toggle-cookies/feature-toggle-cookies.service';
import { LoginService } from './services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialAuthService } from 'angularx-social-login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let azureAdB2CService: AzureAdB2CService;
  let loginService: LoginService;
  let featureToggleCookiesService: FeatureToggleCookiesService;

  const azureAdB2CServiceStub = {
    isLogin() {
      return of(true);
    },
    signIn() {
      return of();
    },
    setCookies() {
    }
  };

  const loginServiceStub = {
    isLogin() {
      return of(true);
    },
    signIn() {
      return of();
    },
    setCookies() {
    }
  };

  const featureToggleCookiesServiceStub = {
    setCookies() {
      return null;
    }
  };

  const socialAuthServiceStub = jasmine.createSpyObj('SocialAuthService', ['signIn', 'authState']);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      declarations: [ LoginComponent ],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub},
        { providers: FeatureToggleCookiesService, useValue: featureToggleCookiesServiceStub},
        { providers: LoginService, useValue: loginServiceStub},
        { provide: SocialAuthService, useValue: socialAuthServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    socialAuthServiceStub.authState = of('some value');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
    loginService = TestBed.inject(LoginService);
    featureToggleCookiesService = TestBed.inject(FeatureToggleCookiesService);
  });

  it('AzureAdB2CService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([AzureAdB2CService], (injectService: AzureAdB2CService) => {
      expect(injectService).toEqual(azureAdB2CService);
    })
  );

  it('FeatureToggleCookiesService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([FeatureToggleCookiesService], (injectService: FeatureToggleCookiesService) => {
      expect(injectService).toEqual(featureToggleCookiesService);
    })
  );

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should sign up or login with google if is not logged-in into the app on Production', inject([Router],  (router: Router) => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(azureAdB2CService, 'setCookies').and.returnValue();
    spyOn(azureAdB2CService, 'signIn').and.returnValue(of(() => {}));
    spyOn(azureAdB2CService, 'getUserId').and.returnValue('userId_123');
    spyOn(featureToggleCookiesService, 'setCookies').and.returnValue(featureToggleCookiesService.setCookies());

    component.login();

    expect(azureAdB2CService.signIn).toHaveBeenCalled();
    expect(azureAdB2CService.setCookies).toHaveBeenCalled();
    expect(azureAdB2CService.getUserId).toHaveBeenCalled();
    expect(featureToggleCookiesService.setCookies).toHaveBeenCalled();
  }));

  // it('should sign up or login with google if is not logged-in into the app Locally', inject([Router],  (router: Router) => {
  //   spyOn(loginService, 'isLogin').and.returnValue(of(false));
  //   spyOn(loginService, 'setLocalStorage').and.returnValue();
  //   spyOn(loginService, 'getUser').and.returnValue(of({token: ''}));
  //   spyOn(loginService, 'setCookies').and.returnValue();
  //   spyOn(loginService, 'signIn').and.returnValue();
  //   spyOn(featureToggleCookiesService, 'setCookies').and.returnValue(featureToggleCookiesService.setCookies());

  //   component.ngOnInit();
  //   component.loginWithGoogle();

  //   expect(loginService.signIn).toHaveBeenCalled();
  //   expect(loginService.setCookies).toHaveBeenCalled();
  //   expect(featureToggleCookiesService.setCookies).toHaveBeenCalled();
  // }));

  it('should not sign-up or login with google if is already logged-in into the app on Production', inject([Router],  (router: Router) => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(router, 'navigate').and.stub();
    component.login();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

  // it('should not sign-up or login with google if is already logged-in into the app Locally', inject([Router],  (router: Router) => {
  //   spyOn(loginService, 'isLogin').and.returnValue(of(true));
  //   spyOn(router, 'navigate').and.stub();
  //   component.loginWithGoogle();
  //   expect(loginService.isLogin).toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalledWith(['']);
  // }));
});
