import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { User } from '../../models/users';
import { GrantRoleUser, LoadUsers, RevokeRoleUser, UserActionTypes } from '../../store/user.actions';
import { getIsLoading } from '../../store/user.selectors';
import { FeatureManagerService } from 'src/app/modules/shared/feature-toggles/feature-toggle-manager.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  users: User[] = [];
  isLoading$: Observable<boolean>;
  loadUsersSubscription: Subscription;
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  isFlagOn;

  constructor(
    private store: Store<User>,
    private actionsSubject$: ActionsSubject,
    private featureManagerService: FeatureManagerService
  ) {
    this.isLoading$ = store.pipe(delay(0), select(getIsLoading));
    this.isFeatureToggleAactivated().subscribe((flag) => {
      this.isFlagOn = flag;
      console.log(this.isFlagOn);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
    this.loadUsersSubscription = this.actionsSubject$
      .pipe(filter((action: any) => action.type === UserActionTypes.LOAD_USERS_SUCCESS))
      .subscribe((action) => {
        this.users = action.payload;
        this.rerenderDataTable();
      });

    this.loadUsersSubscription = this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === UserActionTypes.GRANT_USER_ROLE_SUCCESS ||
            action.type === UserActionTypes.REVOKE_USER_ROLE_SUCCESS
        )
      )
      .subscribe((action) => {
        this.store.dispatch(new LoadUsers());
        this.rerenderDataTable();
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

  isAdmin(role) {
    return role ? true : false;
  }

  revokeOrGrantRole(userId: string, userRole: string) {
    userRole
      ? this.store.dispatch(new RevokeRoleUser(userId, 'admin'))
      : this.store.dispatch(new GrantRoleUser(userId, 'admin'));
  }

  isFeatureToggleAactivated() {
    return this.featureManagerService.isToggleEnabledForUser('ui-list-test-users').pipe(
      map((enabled) => {
        if (enabled === true) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
