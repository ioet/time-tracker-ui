import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersListComponent } from './users-list.component';
import { UserActionTypes, UserState, LoadUsers, AddUserToGroup, RemoveUserFromGroup } from '../../store';
import { ActionsSubject } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';
import { GrantUserRole, RevokeUserRole } from '../../store/user.actions';
import { ROLES } from '../../../../../environments/environment';

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

  const AddGroupTypes = [{ groupName: 'time-tracker-admin' }, { groupName: 'time-tracker-tester' }];

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
      };

      spyOn(store, 'dispatch');

      component.switchGroup(groupName, user);

      expect(store.dispatch).toHaveBeenCalledWith(new AddUserToGroup(user.id, groupName));
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
      };

      spyOn(store, 'dispatch');

      component.switchGroup(groupName, user);

      expect(store.dispatch).toHaveBeenCalledWith(new RemoveUserFromGroup(user.id, groupName));
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

  it('When the toggle is enabled, the role must be added to the user ', () => {
    const availableRoles = [
      {
        name: 'admin',
        value: 'time-tracker-admin',
      },
      {
        name: 'test',
        value: 'time-tracker-tester',
      },
    ];

    spyOn(store, 'dispatch');

    const user = {
      id: 'no-matter-id',
      name: 'no-matter-name',
      email: 'no-matter-email',
      roles: [],
    };

    availableRoles.forEach((role) => {
      const isToggleEnabled = true;
      component.updateRole(role, user, isToggleEnabled);
      expect(store.dispatch).toHaveBeenCalledWith(new GrantUserRole(user.id, role.name));
    });
  });

  it('When the toggle is disabled, the role must be removed from the user', () => {
    const availableRoles = [
      {
        name: 'admin',
        value: 'time-tracker-admin',
      },
      {
        name: 'test',
        value: 'time-tracker-tester',
      },
    ];

    spyOn(store, 'dispatch');

    const user = {
      id: 'no-matter-id',
      name: 'no-matter-name',
      email: 'no-matter-email',
      roles: ['time-tracker-admin', 'time-tracker-tester'],
    };

    availableRoles.forEach((role) => {
      const isToggleEnabled = false;
      component.updateRole(role, user, isToggleEnabled);
      expect(store.dispatch).toHaveBeenCalledWith(new RevokeUserRole(user.id, role.name));
    });
  });

  it('When we call ROLES variable should return available roles', () => {
    expect(component.ROLES).toEqual(ROLES);
  });

  afterEach(() => {
    component.dtTrigger.unsubscribe();
    component.loadUsersSubscription.unsubscribe();
    fixture.destroy();
  });
});
