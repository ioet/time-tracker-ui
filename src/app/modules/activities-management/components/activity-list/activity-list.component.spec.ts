import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { allActivities } from './../../store/activity-management.selectors';
import { ActivityState } from './../../store/activity-management.reducers';
import { ArchiveActivity, SetActivityToEdit, UnarchiveActivity } from './../../store/activity-management.actions';
import { ActivityListComponent } from './activity-list.component';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  let store: MockStore<ActivityState>;
  let mockActivitiesSelector;

  const state = {
    data: [{ id: '1', name: 'name', description: 'description', status: 'inactive' }],
    isLoading: false,
    message: '',
    activityIdToEdit: '',
  };
  const operationBtnProps = [
    {
      key: 'active',
      _status: false,
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo:  'fa-check',
      btnName: 'Active',
      iconColor: 'text-success'
    },
    {
      key: 'inactive',
      _status: true,
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo:  'fa-check',
      btnName: 'Inactive',
      iconColor: 'text-danger'
    },
  ];

  beforeEach(waitForAsync(() => {
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

  it('onInit, activities field is populated with data from store', () => {
    component.ngOnInit();

    const expectedData = state.data.map(item => {
      const props = operationBtnProps.find(prop => prop.key === item.status);
      return { ...item, ...props };
    });

    expect(component.activities).toEqual(expectedData);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('deleteActivity, dispatchs DeleteActivity action', () => {
    spyOn(store, 'dispatch');
    component.idToModify = 'id';
    component.deleteActivity();

    expect(store.dispatch).toHaveBeenCalledWith(new ArchiveActivity('id'));
  });

  it('updateActivity, dispatchs SetActivityToEdit action', () => {
    spyOn(store, 'dispatch');

    component.updateActivity('id');

    expect(store.dispatch).toHaveBeenCalledWith(new SetActivityToEdit('id'));
  });

  it('unarchiveActivity, dispatchs UnarchiveActivity action', () => {
    spyOn(store, 'dispatch');
    component.idToModify = 'id';
    component.unarchiveActivity();

    expect(store.dispatch).toHaveBeenCalledWith(new UnarchiveActivity('id'));
  });

  it('openModal should set on true and display \"Are you sure you want to inactive activity\"', () => {
    const message = 'Are you sure you want to disable activity name?';
    const itemData = {
      id: '1',
      name: 'name',
      description: 'description',
      status: 'active',
      key: 'active',
      _status: false,
      btnColor: 'btn-danger',
      btnIcon: 'fa-arrow-circle-down',
      btnName: 'Archive',
    };

    component.openModal(itemData);
    expect(component.showModal).toBeTrue();
    expect(component.message).toBe(message);
  });

  it('changeOperation should call unarchiveActivity() on item._status = true', () => {
    const itemData = {
      id: '1',
      name: 'name',
      description: 'description',
      status: 'inactive',
      key: 'inactive',
      _status: true,
      btnColor: 'btn-primary',
      btnIcon: 'fa-arrow-circle-up',
      btnIconTwo:  'fa-check',
      btnName: 'Active',
      iconColor: 'text-danger'
    };

    spyOn(component, 'unarchiveActivity');
    component.changeOperation(itemData);
    expect(component.unarchiveActivity).toHaveBeenCalled();
  });

  it('changeOperation should call openModal() on item._status = false', () => {
    const itemData = {
      id: '1',
      name: 'name',
      description: 'description',
      status: 'active',
      key: 'active',
      _status: false,
      btnColor: 'btn-danger',
      btnIcon: 'fa-arrow-circle-down',
      btnIconTwo:  'fa-caret-check',
      btnName: 'Archive',
      iconColor: 'text-success'
    };

    spyOn(component, 'openModal');
    component.changeOperation(itemData);
    expect(component.openModal).toHaveBeenCalled();
  });
});
