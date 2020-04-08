import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { LoadActivities, DeleteActivity } from './../../store/activity-management.actions';
import { ActivityState } from './../../store/activity-management.reducers';
import { allActivities } from '../../store';
import { Activity } from '../../../shared/models';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  activities: Activity[] = [];
  public isLoading: boolean;

  constructor(private store: Store<ActivityState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));

    activities$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.activities = response.data;
    });
  }

  deleteActivity(activityId: string) {
    this.store.dispatch(new DeleteActivity(activityId));
  }
}
