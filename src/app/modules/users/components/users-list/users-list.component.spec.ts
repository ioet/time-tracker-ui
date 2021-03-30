import { FeatureManagerService } from 'src/app/modules/shared/feature-toggles/feature-toggle-manager.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersListComponent } from './users-list.component';
import {
  UserActionTypes,
  UserState,
  LoadUsers,
  GrantRoleUser,
  RevokeRoleUser,
  AddUserToGroup,
  RemoveUserFromGroup,
} from '../../store';
import { User } from '../../../user/models/user';
import { ActionsSubject } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { Observable, of } from 'rxjs';
import { FeatureToggleProvider } from 'src/app/modules/shared/feature-toggles/feature-toggle-provider.service';
import { AppConfigurationClient } from '@azure/app-configuration';
import { FeatureFilterProvider } from '../../../shared/feature-toggles/filters/feature-filter-provider.service';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let store: MockStore<UserState>;
  const actionSub: ActionsSubject = new ActionsSubject();
  const fakeAppConfigurationConnectionString = 'Endpoint=http://fake.foo;Id=fake.id;Secret=fake.secret';
  let service: FeatureManagerService;
  let fakeFeatureToggleProvider;

  const state: UserState = {
    data: [
      {
        name: 'name',
        email: 'email',
        roles: ['admin', 'test'],
        groups: ['time-tracker-admin', 'time-tracker-tester'],
        id: 'id',
        tenant_id: 'tenant id',
        deleted: 'delete',
      },
    ],
    isLoading: false,
    message: '',
  };

  beforeEach(
    waitForAsync(() => {
      fakeFeatureToggleProvider = new FeatureToggleProvider(
        new AppConfigurationClient(fakeAppConfigurationConnectionString),
        new FeatureFilterProvider(new AzureAdB2CService())
      );
      service = new FeatureManagerService(fakeFeatureToggleProvider);

      TestBed.configureTestingModule({
        imports: [NgxPaginationModule, DataTablesModule],
        declarations: [UsersListComponent],
        providers: [
          provideMockStore({ initialState: state }),
          { provide: ActionsSubject, useValue: actionSub },
          { provide: FeatureManagerService, useValue: service }
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.setState(state);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when the component is initialized the load User action is triggered', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(new LoadUsers());
  });

  it('on success load users, the user list should be populated', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: UserActionTypes.LOAD_USERS_SUCCESS,
      payload: state.data,
    };

    actionSubject.next(action);

    expect(component.users).toEqual(state.data);
  });

  const actionsParams = [
    { actionType: UserActionTypes.GRANT_USER_ROLE_SUCCESS },
    { actionType: UserActionTypes.REVOKE_USER_ROLE_SUCCESS },
  ];

  actionsParams.map((param) => {
    it(`When action ${param.actionType} is dispatched should triggered load Users action`, () => {
      spyOn(store, 'dispatch');

      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType,
        payload: state.data,
      };

      actionSubject.next(action);

      expect(store.dispatch).toHaveBeenCalledWith(new LoadUsers());
    });
  });

  const actionGroupParams = [
    { actionType: UserActionTypes.ADD_USER_TO_GROUP_SUCCESS },
    { actionType: UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS },
  ];

  actionGroupParams.map((param) => {
    it(`When action ${param.actionType} is dispatched should triggered load Users action`, () => {
      spyOn(store, 'dispatch');

      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType,
        payload: state.data,
      };

      actionSubject.next(action);

      expect(store.dispatch).toHaveBeenCalledWith(new LoadUsers());
    });
  });

  const grantRoleTypes = [
    { roleId: 'admin', roleValue: 'time-tracker-admin' },
    { roleId: 'test', roleValue: 'time-tracker-tester' },
  ];

  grantRoleTypes.map((param) => {
    it(`When user switchRole to ${param.roleId} and don't have any role, should grant ${param.roleValue} Role`, () => {
      const roleId = param.roleId;
      const roleValue = param.roleValue;
      const userRoles = [];
      const userId = 'userId';

      spyOn(store, 'dispatch');

      component.switchRole(userId, userRoles, roleId, roleValue);

      expect(store.dispatch).toHaveBeenCalledWith(new GrantRoleUser(userId, roleId));
    });
  });

  const AddGroupTypes = [
    { groupName: 'time-tracker-admin' },
    { groupName: 'time-tracker-tester' }
  ];

  AddGroupTypes.map((param) => {
    it(`When user switchGroup to ${param.groupName} and doesn't belong to any group, should add ${param.groupName} group to user`, () => {
      const groupName = param.groupName;
      const user = {
        name: 'name',
        email: 'email',
        roles: [],
        groups: [],
        id: 'id',
        tenant_id: 'tenant id',
        deleted: 'delete',
      } ;

      spyOn(store, 'dispatch');

      component.switchGroup(groupName, user);

      expect(store.dispatch).toHaveBeenCalledWith(new AddUserToGroup(user.id, groupName));
    });
  });

  const revokeRoleTypes = [
    { roleId: 'admin', roleValue: 'time-tracker-admin', userRoles: ['time-tracker-admin'] },
    { roleId: 'test', roleValue: 'time-tracker-tester', userRoles: ['time-tracker-tester'] },
  ];

  revokeRoleTypes.map((param) => {
    it(`When user switchRole to ${param.roleId} and have that rol asigned, should revoke ${param.roleValue} Role`, () => {
      const roleId = param.roleId;
      const roleValue = param.roleValue;
      const userRoles = param.userRoles;
      const userId = 'userId';

      spyOn(store, 'dispatch');

      component.switchRole(userId, userRoles, roleId, roleValue);

      expect(store.dispatch).toHaveBeenCalledWith(new RevokeRoleUser(userId, roleId));
    });
  });

  const removeGroupTypes = [
    { groupName: 'time-tracker-admin', userGroups: ['time-tracker-admin'] },
    { groupName: 'time-tracker-tester', userGroups: ['time-tracker-tester'] },
  ];

  removeGroupTypes.map((param) => {
    it(`When user switchGroup to ${param.groupName} and belongs to group, should remove ${param.groupName} group from user`, () => {
      const groupName = param.groupName;
      const user = {
        name: 'name',
        email: 'email',
        roles: [],
        groups: param.userGroups,
        id: 'id',
        tenant_id: 'tenant id',
        deleted: 'delete',
      } ;


      spyOn(store, 'dispatch');

      component.switchGroup(groupName, user);

      expect(store.dispatch).toHaveBeenCalledWith(new RemoveUserFromGroup(user.id, groupName));
    });
  });

  it('on success load users, the data of roles should be an array', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: UserActionTypes.LOAD_USERS_SUCCESS,
      payload: state.data,
    };

    actionSubject.next(action);

    component.users.map((user) => {
      expect(user.roles).toEqual(['admin', 'test']);
    });
  });

  it('on success load users, the data of groups should be an array', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: UserActionTypes.LOAD_USERS_SUCCESS,
      payload: state.data,
    };

    actionSubject.next(action);

    component.users.map((user) => {
      expect(user.groups).toEqual(['time-tracker-admin', 'time-tracker-tester']);
    });
  });

  it('on success load users, the datatable should be reloaded', async () => {
    const actionSubject = TestBed.inject(ActionsSubject);
    const action = {
      type: UserActionTypes.LOAD_USERS_SUCCESS,
      payload: state.data,
    };
    spyOn(component.dtElement.dtInstance, 'then');

    actionSubject.next(action);

    expect(component.dtElement.dtInstance.then).toHaveBeenCalled();
  });

  it('When Component is created, should call the feature toggle method', () => {
    spyOn(component, 'isFeatureToggleActivated').and.returnValue(of(true));

    component.ngOnInit();

    expect(component.isFeatureToggleActivated).toHaveBeenCalled();
    expect(component.isUserGroupsToggleOn).toBe(true);
  });

  const toggleValues = [true, false];
  toggleValues.map((toggleValue) => {
    it(`when FeatureToggle is ${toggleValue} should return ${toggleValue}`, () => {
      spyOn(service, 'isToggleEnabledForUser').and.returnValue(of(toggleValue));

      const isFeatureToggleActivated: Observable<boolean> = component.isFeatureToggleActivated();

      expect(service.isToggleEnabledForUser).toHaveBeenCalled();
      isFeatureToggleActivated.subscribe((value) => expect(value).toEqual(toggleValue));
    });
  });

  afterEach(() => {
    component.dtTrigger.unsubscribe();
    component.loadUsersSubscription.unsubscribe();
    fixture.destroy();
  });
});
