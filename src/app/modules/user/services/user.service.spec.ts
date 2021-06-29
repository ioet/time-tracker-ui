import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', inject(
    [HttpClientTestingModule, UserService],
    (httpClient: HttpClientTestingModule, apiService: UserService) => {
      expect(apiService).toBeTruthy();
      expect(httpClient).toBeTruthy();
    }
  ));

  it('load a user to idUser using GET', () => {
    service.baseUrl = '/users';
    service.loadUser('xyz').subscribe();

    const loadUserRequest = httpMock.expectOne(`${service.baseUrl}/xyz`);
    expect(loadUserRequest.request.method).toBe('GET');
  });
});
