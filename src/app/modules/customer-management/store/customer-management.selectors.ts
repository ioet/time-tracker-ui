import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CustomerState } from './customer-management.reducers';
export const getCustomerState = createFeatureSelector<CustomerState>('customers');

export const getStatusMessage = createSelector(getCustomerState, (messageState) => {
  if (messageState) {
    return messageState.message;
  }
});

export const allCustomers = createSelector(getCustomerState, (state: CustomerState) => {
  return state.customers;
});
