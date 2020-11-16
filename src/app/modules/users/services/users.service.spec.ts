import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
    service.baseUrl = 'users';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('services are ready to used', inject(
    [HttpClientTestingModule, UsersService],
    (httpClient: HttpClientTestingModule, userService: UsersService) => {
      expect(httpClient).toBeTruthy();
      expect(userService).toBeTruthy();
    }
  ));

  it('load all users', () => {
    service.loadUsers().subscribe();

    const loadUserRequest = httpMock.expectOne(service.baseUrl);
    expect(loadUserRequest.request.method).toBe('GET');
  });
});
