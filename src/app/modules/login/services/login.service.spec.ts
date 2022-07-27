import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;
  let socialAuthService: SocialAuthService;
  let account;
  const socialAuthServiceStub = jasmine.createSpyObj('SocialAuthService', ['signOut', 'signIn']);
  const cookieStoreStub = {};
  const helper = new JwtHelperService();
  const getAccountInfo = () => {
    return helper.decodeToken(account);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { providers: CookieService, useValue: cookieStoreStub },
        { provide: SocialAuthService, useValue: socialAuthServiceStub },
      ],
    });
    service = TestBed.inject(LoginService);
    cookieService = TestBed.inject(CookieService);
    httpMock = TestBed.inject(HttpTestingController);
    socialAuthService = TestBed.inject(SocialAuthService);
    account = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFiYyIsIm5hbWUiOiJhYmMiLCJlbWFpbCI6ImFiYyIsImdyb3VwcyI6WyJhYmMiXX0.UNxyDT8XzXJhI1F3LySBU7TJlpENPUPHj8my7Obw2ZM';
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    localStorage.setItem('user', account);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get name from localStorage', () => {
    const name = service.getName();

    expect(name).toEqual(getAccountInfo().name);
  });

  it('should get userId from localStorage', () => {
    const userId = service.getUserId();

    expect(userId).toEqual(getAccountInfo().id);
  });

  it('should get UserGroup from localStorage', () => {
    const userGroup = service.getUserGroup();

    expect(userGroup).toEqual(getAccountInfo().groups);
  });

  it('should get BearerToken from localStorage', () => {
    localStorage.setItem('idToken', 'token');

    const bearerToken = service.getBearerToken();

    expect(bearerToken).toEqual('token');
  });

  it('should set key and value in localStorage', () => {
    service.setLocalStorage('key', 'value');

    const value = localStorage.getItem('key');

    expect(value).toEqual('value');
  });

  it('load a user by sending a token using POST', () => {
    service.baseUrl = '/users';
    service.getUser('token').subscribe();

    const loadUserRequest = httpMock.expectOne(`${service.baseUrl}/login`);
    expect(loadUserRequest.request.method).toBe('POST');
  });

  it('should return true when user is Login', () => {
    spyOn(cookieService, 'check').and.returnValue(true);
    spyOn(service, 'isValidToken').and.returnValue(of(true));

    service.isLogin().subscribe(isLogin => {
      expect(isLogin).toEqual(true);
    });
  });

  it('should return false when user is not Login', () => {
    spyOn(service, 'isValidToken').and.returnValue(of(false));

    service.isLogin().subscribe(isLogin => {
      expect(isLogin).toEqual(false);
    });
  });

  it('should login with social angularx-social-login', () => {
    service.signIn();
    expect(socialAuthService.signIn).toHaveBeenCalled();
  });

  it('should logout with social angularx-social-login', () => {
    spyOn(cookieService, 'deleteAll').and.returnValue();

    service.logout();

    expect(socialAuthService.signOut).toHaveBeenCalled();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(cookieService.deleteAll).toHaveBeenCalled();
  });
});
