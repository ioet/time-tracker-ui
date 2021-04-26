import { CustomerManagementActions, CustomerManagementActionTypes } from './customer-management.actions';
import { Customer } from 'src/app/modules/shared/models';

export interface CustomerState {
  data: Customer[];
  isLoading: boolean;
  message: string;
  customerIdToEdit: string;
  customerId: string;
}

export const initialState: CustomerState = {
  data: [],
  isLoading: false,
  message: '',
  customerIdToEdit: '',
  customerId: ''
};

export const customerManagementReducer = (state: CustomerState = initialState, action: CustomerManagementActions) => {
  const customersList = [...state.data];
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
        customerId: action.payload.id,
        customerIdToEdit: action.payload.id,
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
      const customers = state.data.filter((customer) => customer.id !== action.customerId);
      return {
        ...state,
        data: customers,
        isLoading: false,
        message: 'Customer archived successfully!',
      };
    }

    case CustomerManagementActionTypes.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        data: state.data,
        isLoading: false,
        message: 'Something went wrong deleting customer!',
        customerIdToEdit: '',
      };
    }

    case CustomerManagementActionTypes.UPDATE_CUSTOMER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      const index = customersList.findIndex((customer) => customer.id === action.payload.id);
      customersList[index] = action.payload;
      return {
        ...state,
        data: customersList,
        isLoading: false,
        message: 'Customer updated successfully!',
      };
    }

    case CustomerManagementActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        data: state.data,
        isLoading: false,
        message: 'Something went wrong updating customer!',
      };
    }

    case CustomerManagementActionTypes.SET_CUSTOMER_ID_TO_EDIT: {
      return {
        ...state,
        customerId: action.payload,
        customerIdToEdit: action.payload,
      };
    }

    case CustomerManagementActionTypes.RESET_CUSTOMER_ID_TO_EDIT: {
      return {
        ...state,
        customerIdToEdit: '',
      };
    }

    case CustomerManagementActionTypes.UNARCHIVE_CUSTOMER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CustomerManagementActionTypes.UNARCHIVE_CUSTOMER_SUCCESS: {
      const index = customersList.findIndex((customer) => customer.id === action.payload.id);
      customersList[index] = { ...customersList[index], ...action.payload };
      return {
        ...state,
        data: customersList,
        isLoading: false,
        message: 'Customer unarchive successfully!',
      };
    }

    case CustomerManagementActionTypes.UNARCHIVE_CUSTOMER_FAIL: {
      return {
        ...state,
        data: [],
        isLoading: false,
        message: 'Something went wrong unarchiving customer!',
      };
    }

    default:
      return state;
  }
};
