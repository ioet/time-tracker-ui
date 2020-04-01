import { FormBuilder } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';

import { CreateActivityComponent } from './create-activity.component';

describe('CreateActivityComponent', () => {

  let component: CreateActivityComponent;

  const data = {
    name: '',
    description: ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityComponent],
      providers: [ FormBuilder ]
    });
    component = TestBed.createComponent(CreateActivityComponent).componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form onSubmit', () => {
    spyOn(component.activityForm, 'reset');

    component.onSubmit(data);

    expect(component.activityForm.reset).toHaveBeenCalled();
  });

  it('should get name using activityForm', () => {
    spyOn(component.activityForm, 'get');
    // tslint:disable-next-line:no-unused-expression
    component.name;
    expect(component.activityForm.get).toHaveBeenCalledWith('name');
  });

  it('should get description using activityForm', () => {
    spyOn(component.activityForm, 'get');

    // tslint:disable-next-line:no-unused-expression
    component.description;

    expect(component.activityForm.get).toHaveBeenCalledWith('description');
  });

});
