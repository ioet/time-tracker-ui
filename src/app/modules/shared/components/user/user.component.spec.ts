import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';
import {AppRoutingModule} from '../../../../app-routing.module';
import { LoginService } from '../../../login/services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialAuthService } from 'angularx-social-login';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let azureAdB2CService: AzureAdB2CService;
  let loginService: LoginService;

  const azureAdB2CServiceStub = {
    isLogin() {
      return of(true);
    },
    signIn() {
      return of();
    },
  };
  const loginServiceStub = {
    isLogin() {
      return of(true);
    },
    signIn() {
      return of();
    },
  };

  const socialAuthServiceStub = jasmine.createSpyObj('SocialAuthService', ['authState']);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [AppRoutingModule, HttpClientTestingModule],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub },
        { providers: LoginService, useValue: loginServiceStub },
        { provide: SocialAuthService, useValue: socialAuthServiceStub }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onInit checks if isLogin and gets the name and set tenantIn in the storage', () => {
    component.isProduction = true;
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    spyOn(azureAdB2CService, 'getUserEmail').and.returnValue('Email');
    spyOn(azureAdB2CService, 'setTenantId');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalled();
    expect(azureAdB2CService.getUserEmail).toHaveBeenCalled();
    expect(azureAdB2CService.setTenantId).toHaveBeenCalled();
  });

  it('onInit does not get the name if isLogin false', () => {
    component.isProduction = true;
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    spyOn(azureAdB2CService, 'getUserEmail').and.returnValue('Email');
    spyOn(azureAdB2CService, 'setTenantId');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalledTimes(0);
    expect(azureAdB2CService.getUserEmail).toHaveBeenCalledTimes(0);
    expect(azureAdB2CService.setTenantId).not.toHaveBeenCalled();
  });
  it('onInit checks if isLogin and gets the name and set tenantIn in the storage Locally', () => {
    component.isProduction = false;
    spyOn(loginService, 'isLogin').and.returnValue(of(true));
    spyOn(loginService, 'getName').and.returnValue('Name');
    spyOn(loginService, 'getUserEmail').and.returnValue('Email');
    component.ngOnInit();
    expect(loginService.isLogin).toHaveBeenCalled();
    expect(loginService.getName).toHaveBeenCalled();
    expect(loginService.getUserEmail).toHaveBeenCalled();
  });

  it('onInit does not get the name if isLogin false Locally', () => {
    component.isProduction = false;
    spyOn(loginService, 'isLogin').and.returnValue(of(false));
    spyOn(loginService, 'getName').and.returnValue('Name');
    spyOn(loginService, 'getUserEmail').and.returnValue('Email');
    component.ngOnInit();
    expect(loginService.isLogin).toHaveBeenCalled();
    expect(loginService.getName).toHaveBeenCalledTimes(0);
    expect(loginService.getUserEmail).toHaveBeenCalledTimes(0);
  });
});
