import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() changeValueShowActivityForm = new EventEmitter<boolean>();
  showActivityForm: boolean;

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
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo: 'fa-check',
      btnName: 'Active',
      iconColor: 'text-success'
    }, {
      key: 'inactive',
      _status: true,
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo:  'fa-check',
      btnName: 'Inactive',
      iconColor: 'text-danger'
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
    this.showActivityForm = true;
    this.changeValueShowActivityForm.emit(this.showActivityForm);
  }

  unarchiveActivity(): void {
    this.store.dispatch(new UnarchiveActivity(this.idToModify));
    this.showModal = false;
  }

  openModal(item: Activity): void {
    this.message = `Are you sure you want to disable activity ${item.name}?`;
    this.showModal = true;
  }

  changeOperation(item: ActivityFront): void {
    this.idToModify = item.id;
    !item._status ? this.openModal(item) : this.unarchiveActivity();
  }
}
