import * as actions from './customer-management.actions';

describe('CustomerManagmentActions', () => {
  it('CreateCustomer type is CustomerManagementActionTypes.CREATE_CUSTOMER', () => {
    const createActivity = new actions.CreateCustomer({
      name: 'aa',
      description: 'bb',
      tenant_id: 'cc',
    });
    expect(createActivity.type).toEqual(actions.CustomerManagementActionTypes.CREATE_CUSTOMER);
  });

  it('CreateCustomerSuccess type is CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCES', () => {
    const createActivitySuccess = new actions.CreateCustomerSuccess({
      name: 'aa',
      description: 'bb',
      tenant_id: 'cc',
    });
    expect(createActivitySuccess.type).toEqual(actions.CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS);
  });

  it('CreateCustomerFail type is CustomerManagementActionTypes.CREATE_CUSTOMER_FAIL', () => {
    const createActivityFail = new actions.CreateCustomerFail('error');
    expect(createActivityFail.type).toEqual(actions.CustomerManagementActionTypes.CREATE_CUSTOMER_FAIL);
  });
});
