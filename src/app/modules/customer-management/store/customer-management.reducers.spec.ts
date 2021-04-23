import { CustomerState, customerManagementReducer } from './customer-management.reducers';
import { Customer, Status } from '../../shared/models/index';
import * as actions from './customer-management.actions';

describe('customerManagementReducer', () => {
  const initialState: CustomerState = { data: [], isLoading: false, message: '', customerIdToEdit: '', customerId: '' };
  const customer: Customer = { name: 'aa', description: 'bb', status: 'inactive' };

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

  it('on DeleteCustomer, isLoading is true', () => {
    const customerToDeleteId = '1';
    const action = new actions.DeleteCustomer(customerToDeleteId);
    const state = customerManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on DeleteCustomerSuccess, message equal to Customer removed successfully!', () => {
    const currentState = {
      data: [{ name: 'aa', description: 'bb', tenant_id: 'cc', id: '1', status: 'inactive' }],
      isLoading: false,
      message: '',
      customerIdToEdit: '',
      customerId: '',
    };
    const customerToDeleteId = '1';
    const action = new actions.DeleteCustomerSuccesss(customerToDeleteId);
    const state = customerManagementReducer(currentState, action);

    expect(state.isLoading).toEqual(false);
    expect(state.data.length).toEqual(0);
    expect(state.message).toEqual('Customer archived successfully!');
  });

  it('on DeleteCustomeryFail, message equal to Something went wrong deleting customer!', () => {
    const customerToDeleteId = '1';
    const action = new actions.DeleteCustomerFail(customerToDeleteId);
    const state = customerManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Something went wrong deleting customer!');
  });

  it('on UpdateCustomer, isLoading is true', () => {
    const action = new actions.UpdateCustomer(customer);
    const state = customerManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UpdateCustomerySuccess, customerFound are saved in the store', () => {
    const currentState = {
      data: [{ name: 'aa', description: 'bb', tenant_id: 'cc', id: '1' }],
      isLoading: false,
      message: '',
      customerIdToEdit: '1',
      customerId: '',
    };
    const customerEdited = { name: 'xx', description: 'yy', tenant_id: 'cc', id: '1' };
    const action = new actions.UpdateCustomerSuccess(customerEdited);
    const state = customerManagementReducer(currentState, action);

    expect(state.data).toEqual([customerEdited]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Customer updated successfully!');
  });

  it('on UpdateCustomeryFail, message equal to Something went wrong updating customer!', () => {
    const action = new actions.UpdateCustomerFail('error');
    const state = customerManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong updating customer!');
    expect(state.isLoading).toEqual(false);
  });

  it('on SetCustomerToEdit, should save the customerId to edit', () => {
    const action = new actions.SetCustomerToEdit('1');
    const state = customerManagementReducer(initialState, action);

    expect(state.customerIdToEdit).toEqual('1');
  });

  it('on ResetCustomerToEdit, should clean the customerIdToEdit variable', () => {
    const action = new actions.ResetCustomerToEdit();

    const state = customerManagementReducer(initialState, action);

    expect(state.customerIdToEdit).toEqual('');
  });

  it('on UnarchiveCustomer, isLoading is true', () => {
    const action = new actions.UnarchiveCustomer('1');
    const state = customerManagementReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it('on UnarchiveCustomerSuccess, status customer is change to "active" in the store', () => {
    const currentState = {
      data: [{ name: 'aa', description: 'bb', tenant_id: 'cc', id: '1', status: 'inactive' }],
      isLoading: false,
      message: '',
      customerIdToEdit: '1',
      customerId: '',
    };
    const customerEdited: Status = { id: '1', status: 'active' };
    const expectedCustomer = { name: 'aa', description: 'bb', tenant_id: 'cc', id: '1', status: 'active' };
    const action = new actions.UnarchiveCustomerSuccess(customerEdited);
    const state = customerManagementReducer(currentState, action);

    expect(state.data).toEqual([expectedCustomer]);
    expect(state.isLoading).toEqual(false);
    expect(state.message).toEqual('Customer unarchive successfully!');
  });

  it('on UnarchiveCustomerFail, message equal to Something went wrong unarchiving customer!', () => {
    const action = new actions.UnarchiveCustomerFail('error');
    const state = customerManagementReducer(initialState, action);

    expect(state.message).toEqual('Something went wrong unarchiving customer!');
    expect(state.isLoading).toEqual(false);
  });
});
