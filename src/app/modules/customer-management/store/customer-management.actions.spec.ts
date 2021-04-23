import * as actions from './customer-management.actions';

describe('CustomerManagmentActions', () => {
  it('CreateCustomer type is CustomerManagementActionTypes.CREATE_CUSTOMER', () => {
    const createActivity = new actions.CreateCustomer({
      name: 'aa',
      description: 'bb',
    });
    expect(createActivity.type).toEqual(actions.CustomerManagementActionTypes.CREATE_CUSTOMER);
  });

  it('CreateCustomerSuccess type is CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCES', () => {
    const createActivitySuccess = new actions.CreateCustomerSuccess({
      name: 'aa',
      description: 'bb',
    });
    expect(createActivitySuccess.type).toEqual(actions.CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS);
  });

  it('CreateCustomerFail type is CustomerManagementActionTypes.CREATE_CUSTOMER_FAIL', () => {
    const createActivityFail = new actions.CreateCustomerFail('error');
    expect(createActivityFail.type).toEqual(actions.CustomerManagementActionTypes.CREATE_CUSTOMER_FAIL);
  });

  it('LoadCustomersSuccess type is CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS', () => {
    const action = new actions.LoadCustomersSuccess([]);
    expect(action.type).toEqual(actions.CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS);
  });

  it('LoadCustomersFail type is CustomerManagementActionTypes.LOAD_CUSTOMERS_FAIL', () => {
    const action = new actions.LoadCustomersFail('error');
    expect(action.type).toEqual(actions.CustomerManagementActionTypes.LOAD_CUSTOMERS_FAIL);
  });

  it('DeleteCustomer type is CustomerManagementActionTypes.DELETE_CUSTOMER', () => {
    const deleteCustomer = new actions.DeleteCustomer('abc');
    expect(deleteCustomer.type).toEqual(actions.CustomerManagementActionTypes.DELETE_CUSTOMER);
  });

  it('DeleteCustomerSucess type is CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS', () => {
    const deleteCustomerSucess = new actions.DeleteCustomerSuccesss('abc');
    expect(deleteCustomerSucess.type).toEqual(actions.CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS);
  });

  it('DeleteCustomerFail type is CustomerManagementActionTypes.DELETE_CUSTOMER_FAIL', () => {
    const deleteCustomerFail = new actions.DeleteCustomerFail('error');
    expect(deleteCustomerFail.type).toEqual(actions.CustomerManagementActionTypes.DELETE_CUSTOMER_FAIL);
  });

  it('UpdateCustomer type is CustomerManagementActionTypes.UPDATE_CUSTOMER', () => {
    const updateCustomer = new actions.UpdateCustomer({
      name: 'aa',
      description: 'bb',
    });
    expect(updateCustomer.type).toEqual(actions.CustomerManagementActionTypes.UPDATE_CUSTOMER);
  });

  it('UpdateCustomerSucess type is CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS', () => {
    const updateCustomerSucess = new actions.UpdateCustomerSuccess({
      name: 'aa',
      description: 'bb',
    });
    expect(updateCustomerSucess.type).toEqual(actions.CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS);
  });

  it('UpdateCustomerFail type is CustomerManagementActionTypes.UPDATE_CUSTOMER_FAIL', () => {
    const updateCustomerFail = new actions.UpdateCustomerFail('error');
    expect(updateCustomerFail.type).toEqual(actions.CustomerManagementActionTypes.UPDATE_CUSTOMER_FAIL);
  });

  it('SetCustomerToEdit type is CustomerManagementActionTypes.SET_CUSTOMER_ID_TO_EDIT', () => {
    const setCustomerToEdit = new actions.SetCustomerToEdit('abc');
    expect(setCustomerToEdit.type).toEqual(actions.CustomerManagementActionTypes.SET_CUSTOMER_ID_TO_EDIT);
  });

  it('ResetCustomerToEdit type is CustomerManagementActionTypes.RESET_CustomerId_ID_TO_EDIT', () => {
    const resetCustomerIdToEdit = new actions.ResetCustomerToEdit();
    expect(resetCustomerIdToEdit.type).toEqual(actions.CustomerManagementActionTypes.RESET_CUSTOMER_ID_TO_EDIT);
  });

  it('UnarchiveCustomer type is CustomerManagementActionTypes.UNARCHIVE_CUSTOMER', () => {
    const unArchiveCustomer = new actions.UnarchiveCustomer('id_test');
    expect(unArchiveCustomer.type).toEqual(actions.CustomerManagementActionTypes.UNARCHIVE_CUSTOMER);
  });

  it('UnarchiveCustomerSuccess type is CustomerManagementActionTypes.UNARCHIVE_CUSTOMER_SUCCESS', () => {
    const unArchiveCustomerSuccess = new actions.UnarchiveCustomerSuccess({
      id: 'id_test',
      status: 'active',
    });
    expect(unArchiveCustomerSuccess.type).toEqual(actions.CustomerManagementActionTypes.UNARCHIVE_CUSTOMER_SUCCESS);
  });

  it('UnarchiveCustomerFail type is CustomerManagementActionTypes.UNARCHIVE_CUSTOMER_FAIL', () => {
    const unArchiveCustomerFail = new actions.UnarchiveCustomerFail('error');
    expect(unArchiveCustomerFail.type).toEqual(actions.CustomerManagementActionTypes.UNARCHIVE_CUSTOMER_FAIL);
  });
});
