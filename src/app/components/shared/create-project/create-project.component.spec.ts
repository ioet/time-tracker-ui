import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectComponent } from './create-project.component';
import { Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send the form data on onSubmit buton #onSubmit', () => {
    const project = {
      name: 'app 4',
      details: 'It is a good app',
      status: 'inactive',
      completed: true
    };

    spyOn(component.savedProject, 'emit');
    component.onSubmit(project);
    expect(component.savedProject.emit).toHaveBeenCalled();
  });

  it('should clean the form and send a cancelForm event #reset', () => {
    const project = {
      name: 'app 4',
      details: 'It is a good app',
      status: 'inactive',
      completed: true
    };

    component.projectForm.setValue(project);
    spyOn(component.cancelForm, 'emit');
    component.reset();
    expect(component.projectForm.value.name).toEqual(null);
    expect(component.projectForm.value.details).toEqual(null);
    expect(component.projectForm.value.status).toEqual(null);
    expect(component.projectForm.value.completed).toEqual(null);

    expect(component.cancelForm.emit).toHaveBeenCalled();
  });

  it('form invalid when empty', () => {
    expect(component.projectForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
    const name = component.projectForm.controls.name;
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();

    name.setValue('A');
    expect(name.hasError('required')).toBeFalsy();
  });

  it('details field validity', () => {
    const details = component.projectForm.controls.details;
    expect(details.valid).toBeFalsy();

    details.setValue('');
    expect(details.hasError('required')).toBeTruthy();

    details.setValue('A');
    expect(details.hasError('required')).toBeFalsy();
  });

  it('status field validity', () => {
    const status = component.projectForm.controls.status;
    expect(status.valid).toBeFalsy();

    status.setValue('');
    expect(status.hasError('required')).toBeTruthy();

    status.setValue('A');
    expect(status.hasError('required')).toBeFalsy();
  });

});
