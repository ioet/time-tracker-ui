import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserInfoService } from './user-info.service';
import { LoginService } from '../../login/services/login.service';


describe('UserInfoService', () => {
  let service: UserInfoService;
  const userTest = {
    name: 'Unknown Name',
    email: 'example@mail.com',
    roles: [],
    groups: ['fake-admin', 'fake-tester'],
    id: 'dummy_id_load',
    tenant_id: 'dummy_tenant_id_load',
    deleted: '',
  };

  const mockLoginService = {
    getLocalStorage: () => {
      return JSON.stringify(userTest);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide : LoginService, useValue: mockLoginService}],
    });
    service = TestBed.inject(UserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const params = [
    { groupName: 'fake-admin', expectedValue: true },
    { groupName: 'fake-owner', expectedValue: false },
  ];

  params.map((param) => {
    it(`given group ${param.groupName} and groups [${userTest.groups.toString()}], isMemberOf() should return ${
      param.expectedValue
    }`, () => {
      service.isMemberOf(param.groupName).subscribe((value) => {
        if (param.groupName === 'fake-admin') {
          expect(value).toEqual(true);
        } else {
          expect(value).toEqual(false);
        }
      });
    });
  });

  it('should return true if is Admin', () => {
      service.isMemberOf('fake-admin').subscribe((value) => {
        expect(value).toEqual(true);
      });
  });

  it('should call isAdmin user', () => {
    spyOn(service, 'isMemberOf').withArgs('time-tracker-admin').and.returnValue(of(true));
    service.isAdmin().subscribe((value) => {
        expect(value).toEqual(true);
      });
  });

  it('should call isTester user', () => {
    spyOn(service, 'isMemberOf').withArgs('time-tracker-tester').and.returnValue(of(true));
    service.isTester().subscribe((value) => {
        expect(value).toEqual(true);
      });
  });

});
