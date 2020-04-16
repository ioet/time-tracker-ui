import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CustomerState } from './customer-management.reducers';

const getCustomerState = createFeatureSelector<CustomerState>('customers');
