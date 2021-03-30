import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionsSubject, select, Store, Action } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { FeatureManagerService } from 'src/app/modules/shared/feature-toggles/feature-toggle-manager.service';
import { User } from '../../models/users';
import {
  GrantRoleUser,
  LoadUsers,
  RevokeRoleUser,
  UserActionTypes,
  AddUserToGroup,
  RemoveUserFromGroup,
} from '../../store/user.actions';
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
  isEnableToggleSubscription: Subscription;
  isUserGroupsToggleOn: boolean;

  constructor(
    private store: Store<User>,
    private actionsSubject$: ActionsSubject,
    private featureManagerService: FeatureManagerService
  ) {
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

    this.isEnableToggleSubscription = this.isFeatureToggleActivated().subscribe((flag) => {
      this.isUserGroupsToggleOn = flag;
    });

    this.switchGroupsSubscription = this.filterUserGroup().subscribe((action) => {
      this.store.dispatch(new LoadUsers());
    });

    this.switchRoleSubscription = this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === UserActionTypes.GRANT_USER_ROLE_SUCCESS ||
            action.type === UserActionTypes.REVOKE_USER_ROLE_SUCCESS
        )
      )
      .subscribe((action) => {
        this.store.dispatch(new LoadUsers());
      });
  }

  ngAfterViewInit(): void {
    this.rerenderDataTable();
  }

  ngOnDestroy() {
    this.loadUsersSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
    this.isEnableToggleSubscription.unsubscribe();
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

  switchRole(userId: string, userRoles: string[], roleId: string, roleValue: string) {
    userRoles.includes(roleValue)
      ? this.store.dispatch(new RevokeRoleUser(userId, roleId))
      : this.store.dispatch(new GrantRoleUser(userId, roleId));
  }

  switchGroup(groupName: string, user: User): void {
    this.store.dispatch(
      user.groups.includes(groupName)
        ? new RemoveUserFromGroup(user.id, groupName)
        : new AddUserToGroup(user.id, groupName)
    );
  }

  isFeatureToggleActivated(): Observable<boolean> {
    return this.featureManagerService.isToggleEnabledForUser('switch-group')
      .pipe(map((enabled: boolean) => enabled));
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
