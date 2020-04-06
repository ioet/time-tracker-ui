import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { allActivities } from './../../store/activity-management.selectors';
import { ActivityState } from './../../store/activity-management.reducers';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityListComponent } from './activity-list.component';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  let mockActivitiesSelector;
  const activityToDelete = { id: '1', name: 'X', description: 'ABC'};

  const state = { data: [{id: 'id', name: 'name', description: 'description'}], isLoading: false, message: '' };

  let store: MockStore<ActivityState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListComponent ],
      providers: [ provideMockStore({ initialState: state }) ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);

    mockActivitiesSelector = store.overrideSelector( allActivities, state );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showModal is true onSelectActivityToDelete', () => {
    component.onSelectActivityToDelete(activityToDelete);

    expect(component.showModal).toBeTruthy();
  });

  it('selectedActivity is propulated onSelectActivityToDelete', () => {
    component.onSelectActivityToDelete(activityToDelete);

    expect(component.selectedActivity).toEqual(activityToDelete);
  });

  it('deleteActivity is dispatched onConfirmDeleteActivity', () => {
    spyOn(store, 'dispatch');
    component.selectedActivity = activityToDelete;

    component.onConfirmDeleteActivity();

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('showModal is false and selectedProject is null onConfirmDeleteActivity', () => {
    component.selectedActivity = activityToDelete;
    component.onConfirmDeleteActivity();

    expect(component.showModal).toBeFalsy();
    expect(component.selectedActivity).toBe(null);
  });

  it('onInit, LoadActivities action is dispatched', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('onInit, activities field is populated with data from store', () => {
    component.ngOnInit();

    expect(component.activities).toBe(state.data);
  });

  afterEach(() => { fixture.destroy(); });

});
