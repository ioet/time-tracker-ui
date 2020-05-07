import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivityManagementActionTypes } from '../store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.scss'],
})
export class ActivitiesManagementComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;

  constructor(private actionsSubject$: ActionsSubject, private toastrService: ToastrService) {}

  ngOnInit() {
    this.actionsSubscription = this.actionsSubject$.subscribe((action) => {
      this.setDataNotification(action.type);
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  setDataNotification(action: any) {
    switch (action) {
      case ActivityManagementActionTypes.CREATE_ACTIVITY_SUCCESS: {
        this.toastrService.success('The activity has been saved successfully.');
        break;
      }
      case ActivityManagementActionTypes.UPDATE_ACTIVITY_SUCCESS: {
        this.toastrService.success('The activity has been saved successfully.');
        break;
      }
      case ActivityManagementActionTypes.DELETE_ACTIVITY_SUCCESS: {
        this.toastrService.success('The activity has been removed successfully.');
        break;
      }
      case ActivityManagementActionTypes.CREATE_ACTIVITY_FAIL: {
        this.toastrService.error('An unexpected error happened, please try again later.');
        break;
      }
      case ActivityManagementActionTypes.UPDATE_ACTIVITY_FAIL: {
        this.toastrService.error('An unexpected error happened, please try again later.');
        break;
      }
      case ActivityManagementActionTypes.DELETE_ACTIVITY_FAIL : {
        this.toastrService.error('An unexpected error happened, please try again later.');
        break;
      }
    }
  }
}
