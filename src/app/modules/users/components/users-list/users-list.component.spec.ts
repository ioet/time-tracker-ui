import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NgxPaginationModule } from 'ngx-pagination';
import { UsersListComponent } from './users-list.component';
import { UserActionTypes, UserState, LoadUsers, GrantRoleUser, RevokeRoleUser } from '../../store';
import { FeatureManagerService } from 'src/app/modules/shared/feature-toggles/feature-toggle-manager.service';
import { ActionsSubject } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { Observable, of } from 'rxjs';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let store: MockStore<UserState>;
  let featureManagerService: FeatureManagerService;
  const actionSub: ActionsSubject = new ActionsSubject();

  const state: UserState = {
    data: [
      {
        name: 'name',
        email: 'email',
        role: null,
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
      featureManagerService = TestBed.inject(FeatureManagerService);
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

  it('When Component is created, should call the feature toggle method', () => {
    spyOn(component, 'isFeatureToggleActivated').and.returnValue(of(true));

    component.ngOnInit();

    expect(component.isFeatureToggleActivated).toHaveBeenCalled();
    expect(component.isUserRoleToggleOn).toBe(true);
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

  it('on success load users, the data of roles should be an array and role null', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: UserActionTypes.LOAD_USERS_SUCCESS,
      payload: state.data,
    };

    actionSubject.next(action);

    component.users.map((user) => {
      expect(user.role).toEqual(null);
      expect(user.roles).toEqual(['admin', 'test']);
    });
  });

  it('on success load users, the data of roles should be null and role a string', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const mockState: UserState = {
      data: [
        {
          name: 'name',
          email: 'email',
          role: 'admin',
          roles: null,
          id: 'id',
          tenant_id: 'tenant id',
          deleted: 'delete',
        },
      ],
      isLoading: false,
      message: '',
    };
    const action = {
      type: UserActionTypes.LOAD_USERS_SUCCESS,
      payload: mockState.data,
    };

    actionSubject.next(action);

    component.users.map((user) => {
      expect(user.role).toEqual('admin');
      expect(user.roles).toEqual(null);
    });
  });

  const toggleValues = [true, false];
  toggleValues.map((toggleValue) => {
    it(`when FeatureToggle is ${toggleValue} should return true`, () => {
      spyOn(featureManagerService, 'isToggleEnabledForUser').and.returnValue(of(toggleValue));

      const isFeatureToggleActivated: Observable<boolean> = component.isFeatureToggleActivated();

      expect(featureManagerService.isToggleEnabledForUser).toHaveBeenCalled();
      isFeatureToggleActivated.subscribe((value) => expect(value).toEqual(toggleValue));
    });
  });

  /*
    TODO: block commented on purpose so that when the tests pass and the Feature toggle is removed,
        the table will be rendered again with dtInstance and not with dtOptions

    it('on success load users, the datatable should be reloaded', async () => {
    const actionSubject = TestBed.inject(ActionsSubject);
    const action = {
      type: UserActionTypes.LOAD_USERS_SUCCESS,
      payload: state.data,
    };
    spyOn(component.dtElement.dtInstance, 'then');

    actionSubject.next(action);

    expect(component.dtElement.dtInstance.then).toHaveBeenCalled();
  });*/

  afterEach(() => {
    component.dtTrigger.unsubscribe();
    component.loadUsersSubscription.unsubscribe();
    fixture.destroy();
  });
});
