import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { allActivities } from '../../store';
import { LoadActivities, DeleteActivity, DeleteActivitySuccess } from './../../store/activity-management.actions';
import { ActivityState } from './../../store/activity-management.reducers';
import { Activity } from '../../../shared/models';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {
  @Input() activities: Activity[] = [];
  public isLoading: boolean;

  showModal: boolean;
  selectedActivity: Activity;

  constructor(private store: Store<ActivityState>, private service: ActivityService) {}

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
