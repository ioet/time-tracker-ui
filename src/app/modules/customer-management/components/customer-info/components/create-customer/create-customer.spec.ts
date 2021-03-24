import { LoadCustomerProjects, CleanCustomerProjects } from './../../../projects/components/store/project.actions';
import { LoadProjectTypes, CleanProjectTypes } from './../../../projects-type/store/project-type.actions';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CreateCustomerComponent } from './create-customer';
import { CustomerState, CreateCustomer } from 'src/app/modules/customer-management/store';
import { ResetCustomerToEdit, UpdateCustomer } from './../../../../store/customer-management.actions';
import { Customer } from 'src/app/modules/shared/models';

describe('CreateCustomerComponent', () => {
  let component: CreateCustomerComponent;
  let fixture: ComponentFixture<CreateCustomerComponent>;
  let store: MockStore<CustomerState>;

  const state = {
    data: [],
    isLoading: false,
    message: '',
    customerIdToEdit: '',
    customerId: '',
  };

  const customerData: Customer = {
    name: 'aa',
    description: 'bb',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCustomerComponent],
      providers: [
        FormBuilder,
        provideMockStore({ initialState: state })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    store.setState(state);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit dispatchs UpdateCustomer action', () => {
    spyOn(store, 'dispatch');
    component.customerToEdit = {id: 'id', name: 'xyz'};

    component.onSubmit({ name: 'abc'});

    expect(store.dispatch).toHaveBeenCalledWith(new UpdateCustomer({id: 'id', name: 'abc'}));
  });

  it('should call resetCustomerForm', () => {
    spyOn(component.customerForm, 'reset');
    spyOn(component.closeCustomerComponent, 'emit');
    spyOn(component.hasChangedEvent, 'emit');
    component.resetCustomerForm();

    expect(component.customerForm.reset).toHaveBeenCalled();
    expect(component.closeCustomerComponent.emit).toHaveBeenCalledWith(false);
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(false);
  });

  it('onSubmit, dispatch CreateCustomer and LoadCustomers actions', () => {
    spyOn(store, 'dispatch');

    component.onSubmit(customerData);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateCustomer(customerData));
  });

  it('should call resetCustomerForm', () => {
    spyOn(component.customerForm, 'reset');
    spyOn(store, 'dispatch');
    spyOn(component.closeCustomerComponent, 'emit');

    component.resetCustomerForm();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetCustomerToEdit());
    expect(component.customerForm.reset).toHaveBeenCalled();
    expect(component.closeCustomerComponent.emit).toHaveBeenCalledWith(false);
  });

  it('should be enable tabs and show message Customer created successfully! ', () => {
    component.areTabsActive = false;

    component.ngOnInit();
    component.onSubmit(customerData);

    expect(component.areTabsActive).toBeTrue();
  });

  it('should be disabled tabs and show message An error occurred, try again later. ', () => {
    component.areTabsActive = false;

    component.ngOnInit();
    component.onSubmit(customerData);

    expect(component.areTabsActive).toBeTruthy();
  });

  it('loads projects and projectTypes when customerData is not null', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();
    component.setDataToUpdate(customerData);

    expect(store.dispatch).toHaveBeenCalledWith(new LoadProjectTypes(customerData.id));
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCustomerProjects(customerData.id));
  });

  it('cleans projects and projectTypes when customerData is null', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();
    component.setDataToUpdate(null);

    expect(store.dispatch).toHaveBeenCalledWith(new CleanProjectTypes());
    expect(store.dispatch).toHaveBeenCalledWith(new CleanCustomerProjects());
  });

  it('sets areTabsActive to false and emit its value on markTabsAsInactive', () => {
    component.areTabsActive = true;
    spyOn(component.changeValueAreTabsActives, 'emit');

    component.markTabsAsInactive();

    expect(component.areTabsActive).toBe(false);
    expect(component.changeValueAreTabsActives.emit).toHaveBeenCalledWith(component.areTabsActive);
  });

  it('if detect changes in customer information, it should emit a true', () => {
    component.hasChange = true;
    spyOn(component.hasChangedEvent, 'emit');

    component.onInputChangeCustomer('changes text');

    expect(component.hasChange).toBe(true);
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(component.hasChange);
  });

  it('if not detect changes in customer information, it should emit a false', () => {
    component.hasChange = false;
    spyOn(component.hasChangedEvent, 'emit');

    component.onInputChangeCustomer('');

    expect(component.hasChange).toBe(false);
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(component.hasChange);
  });
});
