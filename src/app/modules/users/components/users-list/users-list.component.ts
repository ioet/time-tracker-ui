import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { User } from '../../models/users';
import { LoadUsers, UserActionTypes } from '../../store/user.actions';
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
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private store: Store<User>, private actionsSubject$: ActionsSubject) {
    this.isLoading$ = store.pipe(delay(0), select(getIsLoading));
  }

  ngOnInit(): void {
    this.loadUsersSubscription = this.actionsSubject$
      .pipe(filter((action: any) => action.type === UserActionTypes.LOAD_USERS_SUCCESS))
      .subscribe((action) => {
        this.users = action.payload;
        this.rerenderDataTable();
      });
    this.store.dispatch(new LoadUsers());
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
}
