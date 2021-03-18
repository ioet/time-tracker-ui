import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomerProjectsComponent } from './management-customer-projects.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CustomerState } from '../../store';

describe('ManagmentCustomerProjectsComponent', () => {
  let component: ManagementCustomerProjectsComponent;
  let fixture: ComponentFixture<ManagementCustomerProjectsComponent>;
  let store: MockStore<CustomerState>;

  const state = {
    data: [],
    isLoading: false,
    message: '',
    customerIdToEdit: '',
    customerId: '',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementCustomerProjectsComponent],
      providers: [
        provideMockStore({ initialState: state })
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCustomerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    store.setState(state);
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be enable tabs', () => {
    component.areTabsActive = false;
    component.activeTabs(true);
    setTimeout(() => {
      expect(component.areTabsActive).toBeTrue();
      expect(component.activeTab).toEqual('customer-information');
    }, 1);
  });

  it('should show customer-information tab', () => {
    component.areTabsActive = true;
    component.showTab('customer-information');
    expect(component.activeTab).toEqual('customer-information');
  });

  it('should show projects-type tab', () => {
    component.areTabsActive = true;
    component.showTab('projects-type');
    expect(component.activeTab).toEqual('projects-type');
  });

  it('should show projects tab', () => {
    component.areTabsActive = true;
    component.showTab('projects');
    expect(component.activeTab).toEqual('projects');
  });

  it('should call close customer function', () => {
    spyOn(component.closeCustemerForm, 'emit');
    component.closeCustomer(false);
    expect(component.closeCustemerForm.emit).toHaveBeenCalledWith(false);
  });

  it('with changes should emit a true ', () => {
    spyOn(component.sendChanges, 'emit');

    component.getChanges(true);

    expect(component.sendChanges.emit).toHaveBeenCalledWith(true);
  });
});
