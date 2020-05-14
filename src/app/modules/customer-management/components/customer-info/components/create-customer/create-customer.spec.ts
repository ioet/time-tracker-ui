import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CreateCustomerComponent } from './create-customer';
import { CustomerState, CreateCustomer } from 'src/app/modules/customer-management/store';
import { ResetCustomerToEdit, UpdateCustomer } from './../../../../store/customer-management.actions';
import { Customer } from 'src/app/modules/shared/models';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

describe('CreateCustomerComponent', () => {
  let component: CreateCustomerComponent;
  let fixture: ComponentFixture<CreateCustomerComponent>;
  let store: MockStore<CustomerState>;
  const toastrService = {
    success: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCustomerComponent],
      providers: [
        FormBuilder,
        provideMockStore({ initialState: state }),
        { provide: ToastrService, useValue: toastrService },
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

    component.resetCustomerForm();

    expect(component.customerForm.reset).toHaveBeenCalled();
    expect(component.closeCustomerComponent.emit).toHaveBeenCalledWith(false);
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

  it('set data to update ', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();
    component.setDataToUpdate(customerData);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
