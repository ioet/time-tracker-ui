import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Activity } from '../../../shared/models';
import { ActivityState } from './../../store/activity-management.reducers';
import { CreateActivity, UpdateActivity, getActivityById, ResetActivityToEdit, SetActivityToEdit } from '../../store';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss'],
})
export class CreateActivityComponent implements OnInit {
  @Input() showActivityForm: boolean;
  @Output() changeValueShowActivityForm = new EventEmitter<boolean>();
  activityForm: FormGroup;
  activityToEdit: Activity;
  constructor(private formBuilder: FormBuilder, private store: Store<ActivityState>) {
    this.activityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    const activities$ = this.store.pipe(select(getActivityById));
    activities$.subscribe((activity) => {
      this.activityToEdit = activity;
      this.setDataToUpdate(this.activityToEdit);
    });
  }

  get name() {
    return this.activityForm.get('name');
  }

  get description() {
    return this.activityForm.get('description');
  }

  setDataToUpdate(activityData: Activity) {
    if (activityData) {
      this.activityForm.setValue({
        name: activityData.name,
        description: activityData.description,
      });
    }
  }

  onSubmit(activityData) {
    this.activityForm.reset();

    if (this.activityToEdit) {
      const activity = {
        ...activityData,
        id: this.activityToEdit.id,
      };
      this.store.dispatch(new UpdateActivity(activity));
    } else {
      this.store.dispatch(new CreateActivity(activityData));
      this.activityForm.get('description').setValue('');
    }
    this.showActivityForm = false;
    this.changeValueShowActivityForm.emit(this.showActivityForm);
  }

  cancelButton() {
    this.activityForm.reset();
    this.store.dispatch(new ResetActivityToEdit());
    this.showActivityForm = false;
    this.changeValueShowActivityForm.emit(this.showActivityForm);
  }

  activateActivityForm() {
    this.store.dispatch(new SetActivityToEdit(null));
    this.showActivityForm = true;
    this.activityForm.reset();
  }
}
