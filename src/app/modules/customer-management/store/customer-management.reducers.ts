import { CustomerManagementActions, CustomerManagementActionTypes } from './customer-management.actions';
import { Customer } from '../../shared/models/customer.model';

export interface CustomerState {
  data: Customer[];
  isLoading: boolean;
  message: string;
}

export const initialState: CustomerState = {
  data: [],
  isLoading: false,
  message: '',
};

export function customerManagementReducer(
  state: CustomerState = initialState,
  action: CustomerManagementActions
): CustomerState {
  switch (action.type) {
    case CustomerManagementActionTypes.CREATE_CUSTOMER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return {
        ...state,
        data: [action.payload],
        isLoading: false,
        message: 'Customer created successfully!',
      };
    }

    case CustomerManagementActionTypes.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        data: [],
        isLoading: false,
        message: 'An error occurred, try again later.',
      };
    }

    default:
      return state;
  }
}
