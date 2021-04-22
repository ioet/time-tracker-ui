import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { getIsLoading } from 'src/app/modules/activities-management/store/activity-management.selectors';
import { Activity, ActivityFront } from '../../../shared/models';
import { allActivities } from '../../store';
import { ArchiveActivity, LoadActivities, SetActivityToEdit, UnarchiveActivity } from './../../store/activity-management.actions';
import { ActivityState } from './../../store/activity-management.reducers';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  constructor(private store: Store<ActivityState>) {
    this.isLoading$ = store.pipe(delay(0), select(getIsLoading));
  }
  activities: ActivityFront[] = [];
  showModal = false;
  activityToDelete: Activity;
  message: string;
  idToModify: string;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    const operationBtnProps = [{
      key: 'active',
      _status: false,
      btnColor: 'btn-danger',
      btnIcon: 'fa-arrow-circle-down',
      btnName: 'Archive',
    }, {
      key: 'inactive',
      _status: true,
      btnColor: 'btn-primary',
      btnIcon: 'fa-arrow-circle-up',
      btnName: 'Active',
    }];

    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(
      select(allActivities),
      map((activity: Activity[]) => {
        return activity.map(item => {
          const addProps = operationBtnProps.find(prop => (prop.key === item.status));
          return { ...item, ...addProps };
        });
      }),
    );

    activities$.subscribe((response) => {
      this.activities = response;
    });
  }

  deleteActivity(): void {
    this.store.dispatch(new ArchiveActivity(this.idToModify));
    this.showModal = false;
  }

  updateActivity(activityId: string): void {
    this.store.dispatch(new SetActivityToEdit(activityId));
  }

  unarchiveActivity(): void {
    this.store.dispatch(new UnarchiveActivity(this.idToModify));
    this.showModal = false;
  }

  openModal(item: Activity): void {
    this.message = `Are you sure you want to archive activity ${item.name}?`;
    this.showModal = true;
  }

  changeOperation(item: ActivityFront): void {
    this.idToModify = item.id;
    !item._status ? this.openModal(item) : this.unarchiveActivity();
  }
}
