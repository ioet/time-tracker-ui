import { FormBuilder } from '@angular/forms';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CreateActivityComponent } from './create-activity.component';
import { ActivityState, CreateActivity } from '../../store';
import { Activity } from 'src/app/modules/shared/models';

describe('CreateActivityComponent', () => {
  let component: CreateActivityComponent;
  let fixture: ComponentFixture<CreateActivityComponent>;
  let store: MockStore<ActivityState>;

  const state = { data: [{ id: 'id', name: 'name', description: 'description' }], isLoading: false, message: '' };

  const data: Activity[] = [
    {
      id: '1',
      name: 'Training',
      description: 'It is good for learning',
    },
  ];

  const activity: Activity = {
    id: '1',
    name: 'Training',
    description: 'It is good for learning',
  };

  beforeEach(async(() => {
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

  it('should dispatch createActivity action #onSubmit', () => {
    spyOn(store, 'dispatch');
    component.onSubmit(activity);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateActivity(activity));
  });
});
