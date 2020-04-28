import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { allActivities } from './../../store/activity-management.selectors';
import { ActivityState } from './../../store/activity-management.reducers';
import { DeleteActivity, SetActivityToEdit } from './../../store/activity-management.actions';
import { ActivityListComponent } from './activity-list.component';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  let store: MockStore<ActivityState>;
  let mockActivitiesSelector;

  const state = {
    data: [{ id: 'id', name: 'name', description: 'description' }],
    isLoading: false,
    message: '',
    activityIdToEdit: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityListComponent],
      providers: [provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);
    mockActivitiesSelector = store.overrideSelector(allActivities, state.data);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit, LoadActivities action is dispatched', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('deleteActivity, dispatchs DeleteActivity action', () => {
    spyOn(store, 'dispatch');

    component.deleteActivity('id');

    expect(store.dispatch).toHaveBeenCalledWith(new DeleteActivity('id'));
  });

  it('updateActivity, dispatchs SetActivityToEdit action', () => {
    spyOn(store, 'dispatch');

    component.updateActivity('id');

    expect(store.dispatch).toHaveBeenCalledWith(new SetActivityToEdit('id'));
  });

  it('onInit, activities field is populated with data from store', () => {
    component.ngOnInit();

    expect(component.activities).toBe(state.data);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
