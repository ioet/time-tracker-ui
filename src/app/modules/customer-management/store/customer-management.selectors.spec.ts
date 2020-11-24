import * as selectors from './customer-management.selectors';

describe('Customer selectors', () => {
  it('should select the message', () => {
    const anyMessage = 'my-message';
    const customerState = { message: anyMessage };

    expect(selectors.getStatusMessage.projector(customerState)).toBe(anyMessage);
  });

  it('should select the customer list', () => {
    const data = [];
    const customerState = { data };
    expect(selectors.allCustomers.projector(customerState)).toBe(data);
  });

  it('should select the customerIdtoEdit', () => {
    const customerIdToEdit = 'abc';
    const customerState = { customerIdToEdit };
    expect(selectors.customerIdtoEdit.projector(customerState)).toBe(customerIdToEdit);
  });

  it('should select the customerId', () => {
    const customerId = 'abc';
    const customerState = { customerId };
    expect(selectors.getCustomerId.projector(customerState)).toBe(customerId);
  });

  it('should select customerUnderEdition', () => {
    const customerId = 'id';
    const customers = [{id: 'id', name: 'abc', description: 'xxx'},
    {id: '2', name: 'xyz', description: 'yyy'}];
    const customerFound = selectors.getCustomerUnderEdition.projector(customers, customerId);
    expect(customerFound).toEqual(customers[0]);
  });

  it('should select getIsLoading', () => {
    const isLoadingValue = true;
    const customerManagementState = { isLoading: isLoadingValue };

    expect(selectors.getIsLoading.projector(customerManagementState)).toBe(isLoadingValue);
  });
});
