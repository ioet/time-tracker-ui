import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { LoadActivities, DeleteActivity, SetActivityToEdit } from './../../store/activity-management.actions';
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
  showModal = false;
  activityToDelete: Activity;
  message: string;
  idToDelete: string;
  constructor(private store: Store<ActivityState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));

    activities$.subscribe((response) => {
      this.activities = response;
    });
  }

  deleteActivity() {
    this.store.dispatch(new DeleteActivity(this.idToDelete));
    this.showModal = true;
  }

  updateActivity(activityId: string) {
    this.store.dispatch(new SetActivityToEdit(activityId));
  }

  openModal(item: Activity) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to delete ${item.name}?`;
    this.showModal = true;
  }
}
