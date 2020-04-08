import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivityState } from './../../store/activity-management.reducers';
import { CreateActivity } from '../../store';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss'],
})
export class CreateActivityComponent {
  activityForm: FormGroup;
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<ActivityState>) {
    this.activityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit(activityData) {
    this.activityForm.reset();
    this.store.dispatch(new CreateActivity(activityData));
  }

  get name() {
    return this.activityForm.get('name');
  }

  get description() {
    return this.activityForm.get('description');
  }
}
