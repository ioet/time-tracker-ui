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
import { UserService } from '../user/services/user.service';


// since the backend is not in Azure, this module is not used
xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let azureAdB2CService: AzureAdB2CService;
  let loginService: LoginService;
  let userService: UserService;
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

  const userTest = {
    name: 'user',
    email: 'test@test.com',
    roles: ['admin'],
    groups: ['admin'],
    id: 'user_id',
    tenant_id: 'tenant_test',
    deleted: 'no',
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
    userService = TestBed.inject(UserService);
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
    spyOn(userService, 'loadUser').withArgs('userId_123').and.returnValue(of(userTest));
    spyOn(featureToggleCookiesService, 'setCookies').and.returnValue(featureToggleCookiesService.setCookies());

    component.login();

    expect(azureAdB2CService.signIn).toHaveBeenCalled();
    expect(azureAdB2CService.setCookies).toHaveBeenCalled();
    expect(azureAdB2CService.getUserId).toHaveBeenCalled();
    expect(featureToggleCookiesService.setCookies).toHaveBeenCalled();
    expect(userService.loadUser).toHaveBeenCalledWith('userId_123');
  }));

  it('should not sign-up or login with google if is already logged-in into the app on Production', inject([Router],  (router: Router) => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(router, 'navigate').and.stub();
    component.login();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

});
