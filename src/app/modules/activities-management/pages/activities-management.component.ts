import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Activity } from '../../shared/models';
import { SetActivityToEdit } from '../store';

@Component({
  selector: 'app-activities-management',
  templateUrl: './activities-management.component.html',
  styleUrls: ['./activities-management.component.scss'],
})
export class ActivitiesManagementComponent {
  @Output() sendChanges = new EventEmitter<boolean>();
  @Output() closeActivityForm = new EventEmitter<boolean>();
  showActivityForm = false;
  hasChangeComponent = false;
  hasChanged: boolean;
  constructor(private store: Store<Activity>) {}

  activateActivityForm() {
    this.store.dispatch(new SetActivityToEdit(null));
    !this.showActivityForm ? this.showActivityForm = true : this.showActivityForm = false;
  }

  closeFormActivity(event) {
    this.showActivityForm = event;
  }
}
