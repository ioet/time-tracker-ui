import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivitiesManagementComponent } from './activities-management.component';
import { SetActivityToEdit } from '../store';
import { Activity } from '../../shared/models';

describe('ActivitiesManagementComponent', () => {
  let component: ActivitiesManagementComponent;
  let fixture: ComponentFixture<ActivitiesManagementComponent>;
  let store: MockStore<Activity>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ActivitiesManagementComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action on activateActivityForm', () => {
    spyOn(store, 'dispatch');

    component.activateActivityForm();

    expect(store.dispatch).toHaveBeenCalledWith(new SetActivityToEdit(null));
  });

  it('should call closeActivityForm function', () => {
    component.closeFormActivity(false);

    expect(component.showActivityForm).toBe(false);
  });


});
