import { FormBuilder } from '@angular/forms';
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CreateActivityComponent } from './create-activity.component';
import {
  ActivityState,
  CreateActivity,
  UpdateActivity,
  activityIdToEdit,
  allActivities,
  ResetActivityToEdit,
  SetActivityToEdit,
} from '../../store';
import { getActivityById } from '../../store/activity-management.selectors';
import { Activity } from 'src/app/modules/shared/models';

describe('CreateActivityComponent', () => {
  let component: CreateActivityComponent;
  let fixture: ComponentFixture<CreateActivityComponent>;
  let store: MockStore<ActivityState>;
  let activityIdtoEditMock;
  let allActivitiesMock;
  let getActivityByIdMock;
  let getActivityByIdSelectorMock;

  const state = {
    data: [{ id: '', name: '', description: '' }],
    isLoading: false,
    message: '',
    activityIdToEdit: '',
  };

  const activity: Activity = {
    id: '1',
    name: 'Training',
    description: 'It is good for learning',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActivityComponent],
      providers: [FormBuilder, provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('onInit, LoadActivitys action is despatched', () => {
    getActivityByIdSelectorMock = store.overrideSelector(getActivityById, activity);
    component.ngOnInit();
    expect(component.activityToEdit).toEqual(activity);
  });

  it('should reset form onSubmit and dispatch UpdateActivity action', () => {
    const currentState = {
      data: [{ id: '1', name: 'xxx', description: 'xxxx' }],
      isLoading: false,
      message: '',
      activityIdToEdit: '1',
    };

    activityIdtoEditMock = store.overrideSelector(activityIdToEdit, currentState.activityIdToEdit);
    allActivitiesMock = store.overrideSelector(allActivities, currentState.data);
    getActivityByIdMock = store.overrideSelector(allActivitiesMock, activityIdtoEditMock);

    component.activityToEdit = getActivityByIdMock;

    const activityForm = {
      name: 'Develop',
      description: 'xxx',
    };

    const activityUpdated = {
      id: component.activityToEdit.id,
      name: 'Develop',
      description: 'xxx',
    };

    spyOn(component.activityForm, 'reset');
    spyOn(store, 'dispatch');

    component.onSubmit(activityForm);

    expect(component.activityForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateActivity(activityUpdated));
  });

  it('should reset form onSubmit and dispatch CreateActivity action', () => {
    component.activityToEdit = undefined;

    spyOn(component.activityForm, 'reset');
    spyOn(store, 'dispatch');

    component.onSubmit(activity);

    expect(component.activityForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateActivity(activity));
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

  it('should set data in activityForm', () => {
    const activityDataForm = {
      name: 'Training',
      description: 'It is good for learning',
    };

    spyOn(component.activityForm, 'setValue');

    component.setDataToUpdate(activity);
    expect(component.activityForm.setValue).toHaveBeenCalledTimes(1);
    expect(component.activityForm.setValue).toHaveBeenCalledWith(activityDataForm);
  });

  it('should dispatch a ResetActivityToEdit action', () => {
    spyOn(store, 'dispatch');

    component.cancelButton();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetActivityToEdit());
  });

  it('should dispatch an action on activateActivityForm', () => {
    spyOn(store, 'dispatch');

    component.activateActivityForm();

    expect(store.dispatch).toHaveBeenCalledWith(new SetActivityToEdit(null));
  });
});
