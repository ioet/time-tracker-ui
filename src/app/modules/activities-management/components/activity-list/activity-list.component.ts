import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { getIsLoading } from 'src/app/modules/activities-management/store/activity-management.selectors';
import { Activity } from '../../../shared/models';
import { allActivities } from '../../store';
import { DeleteActivity, LoadActivities, SetActivityToEdit } from './../../store/activity-management.actions';
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
  activities: Activity[] = [];
  showModal = false;
  activityToDelete: Activity;
  message: string;
  idToDelete: string;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));

    activities$.subscribe((response) => {
      this.activities = response;
    });
  }

  deleteActivity() {
    // this.store.dispatch(new DeleteActivity(this.idToDelete));
    console.log('despachado el evento');
    this.showModal = false;
  }

  updateActivity(activityId: string) {
    this.store.dispatch(new SetActivityToEdit(activityId));
  }

  openModal(item: Activity) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to archive activity ${item.name}?`;
    this.showModal = true;
    console.log(`Despliegue del modal para id: ${item.id}`);
  }

  switchStatus(evt: boolean, item: Activity): void {
    if (!evt) {
      // FIXME: Si el usuario selecciona cancelar, se produce la animación de cambio
      // del switch
      this.openModal(item);
    } else {
      this.showModal = false;
      // TODO: dispatch para actualizar la operacion
      // this.store.dispatch(new SetToTrueActivity());
    }
  }

  OnSwitch(item: Activity): Observable<boolean> {
    // FIXME: OnBeforeChange debería ser un evento que traiga el estado del switch
    // para poder realizar una acción antes de que el estado cambie.
    return of(true);
  }
}
