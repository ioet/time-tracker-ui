import { FormBuilder } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';

import { CreateActivityComponent } from './create-activity.component';

describe('CreateActivityComponent', () => {

  let component: CreateActivityComponent;

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
});
