import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer-management.reducers';

export const getCustomerState = createFeatureSelector<CustomerState>('customers');

export const getStatusMessage = createSelector(getCustomerState, (messageState) => {
  if (messageState) {
    return messageState.message;
  }
});

export const allCustomers = createSelector(getCustomerState, (state: CustomerState) => {
  if (state) {
    return state.data;
  }
});

export const customerIdtoEdit = createSelector(getCustomerState, (state: CustomerState) => {
  if (state) {
    return state.customerIdToEdit;
  }
});

export const getCustomerId = createSelector(getCustomerState, (state: CustomerState) => {
  if (state) {
    return state.customerId;
  }
});

export const getCustomerUnderEdition = createSelector(allCustomers, customerIdtoEdit, (customers, customerIdToEdit) => {
  if (customers) {
    return customers.find((customer) => {
      return customer.id === customerIdToEdit;
    });
  }
});

export const getIsLoading = createSelector(getCustomerState, (state: CustomerState) => {
  return state.isLoading;
});
