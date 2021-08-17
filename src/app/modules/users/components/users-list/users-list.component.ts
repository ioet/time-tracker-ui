import { GrantUserRole, RevokeUserRole } from './../../store/user.actions';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionsSubject, select, Store, Action } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { ROLES } from 'src/environments/environment';
import { User } from '../../models/users';
import { LoadUsers, UserActionTypes, AddUserToGroup, RemoveUserFromGroup } from '../../store/user.actions';
import { getIsLoading } from '../../store/user.selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  users: User[] = [];
  isLoading$: Observable<boolean>;
  loadUsersSubscription: Subscription;
  switchRoleSubscription: Subscription;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  switchGroupsSubscription: Subscription;

  public get ROLES() {
    return ROLES;
  }

  constructor(private store: Store<User>, private actionsSubject$: ActionsSubject) {
    this.isLoading$ = store.pipe(delay(0), select(getIsLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
    this.loadUsersSubscription = this.actionsSubject$
      .pipe(filter((action: any) => action.type === UserActionTypes.LOAD_USERS_SUCCESS))
      .subscribe((action) => {
        this.users = action.payload;
        this.rerenderDataTable();
      });

    this.switchGroupsSubscription = this.filterUserGroup().subscribe((action) => {
      this.store.dispatch(new LoadUsers());
    });
  }

  ngAfterViewInit(): void {
    this.rerenderDataTable();
  }

  ngOnDestroy() {
    this.loadUsersSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  private rerenderDataTable(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstances: DataTables.Api) => {
        dtInstances.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }

  switchGroup(groupName: string, user: User): void {
    this.store.dispatch(
      user.groups.includes(groupName)
        ? new RemoveUserFromGroup(user.id, groupName)
        : new AddUserToGroup(user.id, groupName)
    );
  }

  updateRole(role: { name: string; value: string }, user: User, isToggleEnabled: boolean) {
    const action = isToggleEnabled ? new GrantUserRole(user.id, role.name) : new RevokeUserRole(user.id, role.name);
    this.store.dispatch(action);
  }

  filterUserGroup(): Observable<Action> {
    return this.actionsSubject$.pipe(
      filter(
        (action: Action) =>
          action.type === UserActionTypes.ADD_USER_TO_GROUP_SUCCESS ||
          action.type === UserActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS
      )
    );
  }
}
