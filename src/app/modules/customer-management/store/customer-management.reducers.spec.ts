import { CustomerState, customerManagementReducer } from './customer-management.reducers';
import { Customer } from '../../shared/models/customer.model';
import * as actions from './customer-management.actions';

describe('customerManagementReducer', () => {
  const initialState: CustomerState = { data: [], isLoading: false, message: '' };
  const customer: Customer = { name: 'aa', description: 'bb', tenant_id: 'cc' };

  it('on LoadCustomer, isLoading is true ', () => {
    const action = new actions.LoadCustomers();
    const state = customerManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on LoadCustomerSucess, isLoading is false and state has data', () => {
    const data = [];
    const action = new actions.LoadCustomersSuccess(data);
    const state = customerManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
    expect(state.data).toEqual(data);
  });

  it('on LoadCustomerFail, isLoading is false and state has empty data', () => {
    const action = new actions.LoadCustomersFail('doh!!!');
    const state = customerManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
    expect(state.data.length).toBe(0);
  });

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

  it('on CreateCustomerFail, message equal to An error occurred, try again later. ', () => {
    const action = new actions.CreateCustomerFail('error');
    const state = customerManagementReducer(initialState, action);

    expect(state.message).toEqual('An error occurred, try again later.');
    expect(state.isLoading).toEqual(false);
  });
});
