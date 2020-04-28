import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivityManagementActionTypes } from '../store';

@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.scss'],
})
export class ActivitiesManagementComponent implements OnInit, OnDestroy {
  notificationMsg = '';
  showNotification = false;
  isError = false;
  actionsSubscription: Subscription;

  constructor(private actionsSubject$: ActionsSubject) {}

  ngOnInit() {
    this.actionsSubscription = this.actionsSubject$.subscribe((action) => {
      this.setDataNotification(action.type);
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  setDataNotification(action: any) {
    this.showNotification = true;
    switch (action) {
      case ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS: {
        this.notificationMsg = 'The activity has been saved successfully.';
        break;
      }
      case ActivityManagementActionTypes.DELETE_ACTIVITY_SUCCESS: {
        this.notificationMsg = 'The activity has been removed successfully.';
        break;
      }
      case ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL || ActivityManagementActionTypes.DELETE_ACTIVITY_FAIL: {
        this.notificationMsg = 'An unexpected error happened, please try again later.';
        this.isError = true;
        break;
      }
      default: {
        this.showNotification = false;
        break;
      }
    }
    setTimeout(() => ((this.showNotification = false), (this.isError = false)), 3000);
  }
}
