import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
    account = {
      id: 'abc',
      name: 'abc',
      email: 'abc',
      groups: ['abc'],
    };
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
    localStorage.setItem('user2', JSON.stringify(account));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get name from localStorage', () => {
    const name = service.getName();

    expect(name).toEqual(account.name);
  });

  it('should get userId from localStorage', () => {
    const userId = service.getUserId();

    expect(userId).toEqual(account.id);
  });

  it('should get UserGroup from localStorage', () => {
    const userGroup = service.getUserGroup();

    expect(userGroup).toEqual(account.groups);
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

    const isLogin = service.isLogin();

    expect(isLogin).toBeTruthy();
  });

  it('should return false when user is not Login', () => {
    spyOn(cookieService, 'check').and.returnValue(false);

    const isLogin = service.isLogin();

    expect(isLogin).toBeFalsy();
  });

  it('should login with social angularx-social-login', () => {
    service.signIn();
    expect(socialAuthService.signIn).toHaveBeenCalled();
  });

  it('should logout with social angularx-social-login', () => {
    service.logout();
    const cookies = cookieService.getAll();
    expect(socialAuthService.signOut).toHaveBeenCalled();
    expect(localStorage.length).toEqual(0);
    expect(cookies).toEqual({});
  });
});
