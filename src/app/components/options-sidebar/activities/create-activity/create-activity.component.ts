import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Activity } from './../model/activity';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent {

  activityForm: FormGroup;

  @Input()
  activityToEdit: Activity;

  constructor(private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(activityData) {
    // TODO: add proper interaction with API to save this info
    // see https://github.com/ioet/time-tracker-ui/issues/44
    console.log(activityData);
    this.activityForm.reset();
  }

  get name() {
    return this.activityForm.get('name');
  }

  get description() {
    return this.activityForm.get('description');
  }

}
