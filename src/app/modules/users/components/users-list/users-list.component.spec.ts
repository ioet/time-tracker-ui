import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NgxPaginationModule } from 'ngx-pagination';
import { UsersListComponent } from './users-list.component';
import { UserActionTypes, UserState, LoadUsers } from '../../store';
import { ActionsSubject } from '@ngrx/store';
import { DataTablesModule } from 'angular-datatables';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let store: MockStore<UserState>;
  const actionSub: ActionsSubject = new ActionsSubject();

  const state: UserState = {
    data: [{ name: 'name', email: 'email', role: 'role', id: 'id', tenant_id: 'tenant id', deleted: 'delete' }],
    isLoading: false,
    message: '',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule, DataTablesModule],
      declarations: [UsersListComponent],
      providers: [provideMockStore({ initialState: state }), { provide: ActionsSubject, useValue: actionSub }],
    }).compileComponents();
  }));

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
