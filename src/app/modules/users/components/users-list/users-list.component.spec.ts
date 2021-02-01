import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NgxPaginationModule } from 'ngx-pagination';
import { UsersListComponent } from './users-list.component';
import { UserActionTypes, UserState, LoadUsers, GrantRoleUser, RevokeRoleUser } from '../../store';
import { ActionsSubject } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let store: MockStore<UserState>;
  const actionSub: ActionsSubject = new ActionsSubject();

  const state: UserState = {
    data: [
      {
        name: 'name',
        email: 'email',
        roles: ['admin', 'test'],
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
      TestBed.configureTestingModule({
        imports: [NgxPaginationModule, DataTablesModule],
        declarations: [UsersListComponent],
        providers: [provideMockStore({ initialState: state }), { provide: ActionsSubject, useValue: actionSub }],
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

  afterEach(() => {
    component.dtTrigger.unsubscribe();
    component.loadUsersSubscription.unsubscribe();
    fixture.destroy();
  });
});
