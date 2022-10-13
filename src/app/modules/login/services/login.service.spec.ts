import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let cookieService: CookieService;
  let socialAuthService: SocialAuthService;
  let router: Router;
  let account;
  const socialAuthServiceStub = jasmine.createSpyObj('SocialAuthService', ['signOut', 'signIn']);
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  const cookieStoreStub = {};
  const helper = new JwtHelperService();
  const getAccountInfo = () => {
    return helper.decodeToken(account);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        { providers: CookieService, useValue: cookieStoreStub },
        { provide: SocialAuthService, useValue: socialAuthServiceStub },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(LoginService);
    cookieService = TestBed.inject(CookieService);
    socialAuthService = TestBed.inject(SocialAuthService);
    router = TestBed.inject(Router);
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
    localStorage.setItem('user2', '"test_token_123"');
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
    const token  = 'test_123';
    service.baseUrl = '/users';
    const mockSuccessDataPost = {
      SUCCESS: true,
      data: {}
    };
    httpClientSpy.post.and.returnValue(of(mockSuccessDataPost));
    service.getUser(token).subscribe();
    expect(httpClientSpy.post).toHaveBeenCalled();
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

  it('should logout with social angularx-social-login', () => {
    service.router = router;
    spyOn(cookieService, 'deleteAll').and.returnValue();
    spyOn(service, 'invalidateSessionCookie').and.returnValue(of(true));

    service.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(cookieService.deleteAll).toHaveBeenCalled();
  });

  it('should call cookieService when app is isLegacyProd', () => {
    service.isLegacyProd = true;
    service.localStorageKey = 'user2';
    spyOn(cookieService, 'check').and.returnValue(true);
    spyOn(service, 'isValidToken').and.returnValue(of(true));
    service.isLogin().subscribe(isLogin => {
      expect(cookieService.check).toHaveBeenCalled();
    });
  });

  it('should call JSON parse when app is isLegacyProd', () => {
    spyOn(JSON, 'parse').and.returnValue('test_user_123');
    service.isLegacyProd = true;
    service.localStorageKey = 'user2';
    service.getUserId();
    service.getName();
    service.getUserEmail();
    service.getUserGroup();
    expect(JSON.parse).toHaveBeenCalled();
  });

  it('should call setLocalStorage when there is a new_token ', () => {
    spyOn(cookieService, 'check').and.returnValue(true);
    spyOn(service, 'setLocalStorage');
    const token  = 'test123';
    service.baseUrl = '/users';
    const mockSuccessDataPost = {
      SUCCESS: true,
      new_token: 'test_token'
    };
    httpClientSpy.post.and.returnValue(of(mockSuccessDataPost));
    service.isValidToken(token).subscribe();
    expect(service.setLocalStorage).toHaveBeenCalled();
    expect(cookieService.check).toHaveBeenCalled();
  });
});
