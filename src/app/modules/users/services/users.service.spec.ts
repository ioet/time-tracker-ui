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

  it('grant role to a User', () => {
    const userId = 'userId';
    const roleId = 'admin';

    service.grantRole(userId, roleId).subscribe();

    const grantRoleRequest = httpMock.expectOne(`${service.baseUrl}/${userId}/roles/${roleId}/grant`);
    expect(grantRoleRequest.request.method).toBe('POST');
  });

  it('revoke role to a User', () => {
    const userId = 'userId';
    const roleId = 'admin';

    service.revokeRole(userId, roleId).subscribe();

    const grantRoleRequest = httpMock.expectOne(`${service.baseUrl}/${userId}/roles/${roleId}/revoke`);
    expect(grantRoleRequest.request.method).toBe('POST');
  });

  it('add user to group', () => {
    const userId = 'userId';
    const group = 'admin';
    const addGroupURL = `${service.baseUrl}/${userId}/groups/add`;

    service.addUserToGroup(userId, group).subscribe();

    expect(httpMock.expectOne(addGroupURL).request.method).toBe('POST');
  });

  it('remove user from group', () => {
    const userId = 'userId';
    const group = 'admin';
    const removeGroupURL = `${service.baseUrl}/${userId}/groups/remove`;

    service.removeUserFromGroup(userId, group).subscribe();

    expect(httpMock.expectOne(removeGroupURL).request.method).toBe('POST');
  });
});
