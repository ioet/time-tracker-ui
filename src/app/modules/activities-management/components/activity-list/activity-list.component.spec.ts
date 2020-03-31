import { allActivities } from './../../store/activity-management.selectors';
import { Activity } from './../../../shared/models/activity.model';
import { ActivityState } from './../../store/activity-management.reducers';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivityListComponent } from './activity-list.component';
import { MemoizedSelector, State } from '@ngrx/store';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  let mockActivitiesSelector;

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
