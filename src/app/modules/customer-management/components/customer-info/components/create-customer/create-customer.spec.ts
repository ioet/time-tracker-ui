import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerComponent } from './create-customer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CustomerState, CreateCustomer } from 'src/app/modules/customer-management/store';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  it('should call resetCustomerForm', async(() => {
    spyOn(component.customerForm, 'reset');

    component.resetCustomerForm();

    expect(component.customerForm.reset).toHaveBeenCalled();
  }));

  it('onSubmit and dispatch CreateCustomer action', async(() => {
    const customerData: Customer = {
      name: 'aa',
      description: 'bb',
      tenant_id: 'cc',
    };

    spyOn(store, 'dispatch');

    component.onSubmit(customerData);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateCustomer(customerData));
  }));
});
