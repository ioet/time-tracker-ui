import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerComponent } from './create-customer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CustomerState, CreateCustomer } from 'src/app/modules/customer-management/store';
import { FormBuilder } from '@angular/forms';
import { Customer } from 'src/app/modules/shared/models/customer.model';

describe('CreateCustomerComponent', () => {
  let component: CreateCustomerComponent;
  let fixture: ComponentFixture<CreateCustomerComponent>;
  let store: MockStore<CustomerState>;

  const state = {
    data: [],
    isLoading: false,
    message: '',
  };

  const customerData: Customer = {
    name: 'aa',
    description: 'bb',
    tenant_id: 'cc',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCustomerComponent],
      providers: [FormBuilder, provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call resetCustomerForm', () => {
    spyOn(component.customerForm, 'reset');

    component.resetCustomerForm();

    expect(component.customerForm.reset).toHaveBeenCalled();
  });

  it('onSubmit and dispatch CreateCustomer action', () => {
    spyOn(store, 'dispatch');

    component.onSubmit(customerData);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateCustomer(customerData));
  });

  it('should call resetCustomerForm', () => {
    spyOn(component.customerForm, 'reset');

    component.resetCustomerForm();

    expect(component.customerForm.reset).toHaveBeenCalled();
  });

  it('should be enable tabs and show message Customer create successfully! ', () => {
    component.isActiveItemTabs = false;
    component.messageToShow = '';

    spyOn(store, 'dispatch');

    component.ngOnInit();

    component.onSubmit(customerData);

    component.setStatusOnScreen('Customer create successfully!');

    expect(component.messageToShow).toEqual('Customer create successfully!');
    expect(component.isActiveItemTabs).toBeTrue();
  });

  it('should be disabled tabs and show message Something went wrong creating customer! ', () => {
    component.isActiveItemTabs = false;
    component.messageToShow = '';

    spyOn(store, 'dispatch');

    component.ngOnInit();

    component.onSubmit(customerData);

    component.setStatusOnScreen('Something went wrong creating customer!');

    expect(component.messageToShow).toEqual('Something went wrong creating customer!');
    expect(component.isActiveItemTabs).toBeFalse();
  });
});
