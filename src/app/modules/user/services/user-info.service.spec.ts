import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { getUserGroups } from '../store/user.selectors';
import { UserInfoService } from './user-info.service';

describe('UserInfoService', () => {
  let service: UserInfoService;
  let store: MockStore;
  let mockGetUserGroupsSelector: any;
  const initialState = {
    name: 'Unknown Name',
    email: 'example@mail.com',
    roles: [],
    groups: ['fake-admin', 'fake-tester'],
    id: 'dummy_id_load',
    tenant_id: 'dummy_tenant_id_load',
    deleted: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(UserInfoService);
    store = TestBed.inject(MockStore);
    mockGetUserGroupsSelector = store.overrideSelector(getUserGroups, initialState.groups);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call groups selector', () => {
    const expectedGroups = ['fake-admin', 'fake-tester'];

    service.groups().subscribe((value) => {
      expect(value).toEqual(expectedGroups);
    });
  });

  const params = [
    { groupName: 'fake-admin', expectedValue: true, groups: ['fake-admin', 'fake-tester'] },
    { groupName: 'fake-owner', expectedValue: false, groups: ['fake-admin', 'fake-tester'] },
  ];

  params.map((param) => {
    it(`given group ${param.groupName} and groups [${param.groups.toString()}], isMemberOf() should return ${
      param.expectedValue
    }`, () => {
      const groups$ = of(param.groups);

      spyOn(service, 'groups').and.returnValue(groups$);

      service.isMemberOf(param.groupName).subscribe((value) => {
        expect(value).toEqual(param.expectedValue);
      });
    });
  });

  it('should return true if is Admin', () => {
    const isMemberOf = spyOn(service, 'isMemberOf').and.returnValue(of(true));

    service.isAdmin().subscribe((value) => {
      expect(value).toBeTrue();
    });
    expect(isMemberOf).toHaveBeenCalled();
  });

  it('should return true if  is Tester', () => {
    const isMemberOf = spyOn(service, 'isMemberOf').and.returnValue(of(true));

    service.isTester().subscribe((value) => {
      expect(value).toBeTrue();
    });
    expect(isMemberOf).toHaveBeenCalled();
  });
});
