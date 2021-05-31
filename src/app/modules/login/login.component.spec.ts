import { waitForAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FeatureToggleCookiesService } from '../shared/feature-toggles/feature-toggle-cookies/feature-toggle-cookies.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let azureAdB2CService: AzureAdB2CService;
  let featureToggleCookiesService: FeatureToggleCookiesService;

  const azureAdB2CServiceStub = {
    isLogin() {
      return true;
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LoginComponent ],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub},
        { providers: FeatureToggleCookiesService, useValue: featureToggleCookiesServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
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

  it('should sign up or login with google if is not logged-in into the app', inject([Router],  (router: Router) => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(azureAdB2CService, 'setCookies').and.returnValue();
    spyOn(azureAdB2CService, 'signIn').and.returnValue(of(() => {}));
    spyOn(featureToggleCookiesService, 'setCookies').and.returnValue(featureToggleCookiesService.setCookies());

    component.login();

    expect(azureAdB2CService.signIn).toHaveBeenCalled();
    expect(azureAdB2CService.setCookies).toHaveBeenCalled();
    expect(featureToggleCookiesService.setCookies).toHaveBeenCalled();
  }));

  it('should not sign-up or login with google if is already logged-in into the app', inject([Router],  (router: Router) => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(router, 'navigate').and.stub();
    component.login();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));
});
