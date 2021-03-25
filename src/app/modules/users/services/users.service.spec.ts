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

<<<<<<< HEAD
  it('add user to group', () => {
=======
  it('add group to a User', () => {
>>>>>>> feat: TT-188 add & remove groups to user service
    const userId = 'userId';
    const group = 'admin';
    const addGroupURL = `${service.baseUrl}/${userId}/groups/add`;

<<<<<<< HEAD
<<<<<<< HEAD
    service.addUserToGroup(userId, group).subscribe();
=======
    service.addGroupToUser(userId, group).subscribe();
>>>>>>> feat: TT-188 add & remove groups to user service
=======
    service.addUserToGroup(userId, group).subscribe();
>>>>>>> refactor: TT-188 refactor some names

    expect(httpMock.expectOne(addGroupURL).request.method).toBe('POST');
  });

<<<<<<< HEAD
  it('remove user from group', () => {
=======
  it('remove group to a User', () => {
>>>>>>> feat: TT-188 add & remove groups to user service
    const userId = 'userId';
    const group = 'admin';
    const removeGroupURL = `${service.baseUrl}/${userId}/groups/remove`;

<<<<<<< HEAD
<<<<<<< HEAD
    service.removeUserFromGroup(userId, group).subscribe();
=======
    service.removeGroupToUser(userId, group).subscribe();
>>>>>>> feat: TT-188 add & remove groups to user service
=======
    service.removeUserToGroup(userId, group).subscribe();
>>>>>>> refactor: TT-188 refactor some names

    expect(httpMock.expectOne(removeGroupURL).request.method).toBe('POST');
  });
});
