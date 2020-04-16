import { CustomerState, customerManagementReducer } from './customer-management.reducers';
import { Customer } from '../../shared/models/customer.model';
import * as actions from './customer-management.actions';

describe('customerManagementReducer', () => {
  const initialState: CustomerState = { data: [], isLoading: false, message: '' };
  const customer: Customer = { name: 'aa', description: 'bb', tenant_id: 'cc' };

  it('on CreateCustomer, isLoading is true ', () => {
    const action = new actions.CreateCustomer(customer);
    const state = customerManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on CreateCustomerSuccess, customer are saved in the store ', () => {
    const action = new actions.CreateCustomerSuccess(customer);
    const state = customerManagementReducer(initialState, action);

    expect(state.data).toEqual([customer]);
    expect(state.isLoading).toEqual(false);
  });

  it('on CreateCustomerFail, message equal to Something went wrong creating customer! ', () => {
    const action = new actions.CreateCustomerFail('error');
    const state = customerManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong creating customer!');
    expect(state.isLoading).toEqual(false);
  });
});
