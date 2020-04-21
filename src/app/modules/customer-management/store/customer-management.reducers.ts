import { CustomerManagementActions, CustomerManagementActionTypes } from './customer-management.actions';
import { Customer } from 'src/app/modules/shared/models';

export interface CustomerState {
  data: Customer[];
  isLoading: boolean;
  message: string;
  customerIdToEdit: string;
}

export const initialState: CustomerState = {
  data: [],
  isLoading: false,
  message: '',
  customerIdToEdit: '',
};

export function customerManagementReducer(
  state: CustomerState = initialState,
  action: CustomerManagementActions
): CustomerState {
  const customersList = [...state.data];
  const key = 'id';
  switch (action.type) {
    case CustomerManagementActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    }
    case CustomerManagementActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        data: [],
        isLoading: false,
      };
    }

    case CustomerManagementActionTypes.CREATE_CUSTOMER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        message: 'Customer created successfully!',
      };
    }

    case CustomerManagementActionTypes.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        data: state.data,
        isLoading: false,
        message: 'An error occurred, try again later.',
      };
    }

    case CustomerManagementActionTypes.DELETE_CUSTOMER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS: {
      const customers = state.data.filter((customer) => customer[key] !== action.customerId);
      return {
        ...state,
        data: customers,
        isLoading: false,
        message: 'Customer removed successfully!',
      };
    }

    case CustomerManagementActionTypes.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        data: state.data,
        isLoading: false,
        message: 'Something went wrong deleting customer!',
      };
    }

    case CustomerManagementActionTypes.UPDATE_CUSTOMER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      const index = customersList.findIndex((customer) => customer[key] === action.payload[key]);
      customersList[index] = action.payload;
      return {
        ...state,
        data: customersList,
        isLoading: false,
        message: 'Customer updated successfully!',
        customerIdToEdit: '',
      };
    }

    case CustomerManagementActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        data: state.data,
        isLoading: false,
        message: 'Something went wrong updating customer!',
        customerIdToEdit: '',
      };
    }

    case CustomerManagementActionTypes.SET_CUSTOMER_ID_TO_EDIT: {
      return {
        ...state,
        customerIdToEdit: action.payload,
      };
    }

    default:
      return state;
  }
}
