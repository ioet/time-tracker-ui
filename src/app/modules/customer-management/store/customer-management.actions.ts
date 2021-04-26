import { Action } from '@ngrx/store';
import { Customer, Status } from '../../shared/models/customer.model';

export enum CustomerManagementActionTypes {
  CREATE_CUSTOMER = '[CustomerManagement] CREATE_CUSTOMER',
  CREATE_CUSTOMER_SUCCESS = '[CustomerManagement] CREATE_CUSTOMER_SUCCESS',
  CREATE_CUSTOMER_FAIL = '[CustomerManagement] CREATE_CUSTOMER_FAIL',
  LOAD_CUSTOMERS = '[CustomerManagement] LOAD_CUSTOMERS',
  LOAD_CUSTOMERS_SUCCESS = '[CustomerManagement] LOAD_CUSTOMERS_SUCCESS',
  LOAD_CUSTOMERS_FAIL = '[CustomerManagement] LOAD_CUSTOMERS_FAIL',
  DELETE_CUSTOMER = '[CustomerManagement] DELETE_CUSTOMER',
  DELETE_CUSTOMER_SUCCESS = '[CustomerManagement] DELETE_CUSTOMER_SUCCESS',
  DELETE_CUSTOMER_FAIL = '[CustomerManagement] DELETE_CUSTOMER_FAIL',
  UPDATE_CUSTOMER = '[CustomerManagement] UPDATE_CUSTOMER',
  UPDATE_CUSTOMER_SUCCESS = '[CustomerManagement] UPDATE_CUSTOMER_SUCCESS',
  UPDATE_CUSTOMER_FAIL = '[CustomerManagement] UPDATE_CUSTOMER_FAIL',
  SET_CUSTOMER_ID_TO_EDIT = '[CustomerManagement] SET_CUSTOMER_ID_TO_EDIT',
  RESET_CUSTOMER_ID_TO_EDIT = '[CustomerManagement] RESET_CUSTOMER_ID_TO_EDIT',
  UNARCHIVE_CUSTOMER = '[CustomerManagement] UNARCHIVE_CUSTOMER',
  UNARCHIVE_CUSTOMER_SUCCESS = '[CustomerManagement] UNARCHIVE_CUSTOMER_SUCCESS',
  UNARCHIVE_CUSTOMER_FAIL = '[CustomerManagement] UNARCHIVE_CUSTOMER_FAIL',
}

export class LoadCustomers implements Action {
  public readonly type = CustomerManagementActionTypes.LOAD_CUSTOMERS;
}

export class LoadCustomersSuccess implements Action {
  readonly type = CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS;
  constructor(readonly payload: Customer[]) {}
}

export class LoadCustomersFail implements Action {
  public readonly type = CustomerManagementActionTypes.LOAD_CUSTOMERS_FAIL;

  constructor(public error: string) {}
}

export class CreateCustomer implements Action {
  public readonly type = CustomerManagementActionTypes.CREATE_CUSTOMER;

  constructor(public payload: Customer) {}
}

export class CreateCustomerSuccess implements Action {
  public readonly type = CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS;

  constructor(public payload: Customer) {}
}

export class CreateCustomerFail implements Action {
  public readonly type = CustomerManagementActionTypes.CREATE_CUSTOMER_FAIL;

  constructor(public error: string) {}
}

export class DeleteCustomer implements Action {
  public readonly type = CustomerManagementActionTypes.DELETE_CUSTOMER;

  constructor(public customerId: string) {}
}

export class DeleteCustomerSuccesss implements Action {
  public readonly type = CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS;

  constructor(public customerId: string) {}
}

export class DeleteCustomerFail implements Action {
  public readonly type = CustomerManagementActionTypes.DELETE_CUSTOMER_FAIL;

  constructor(public error: string) {}
}

export class UpdateCustomer implements Action {
  public readonly type = CustomerManagementActionTypes.UPDATE_CUSTOMER;

  constructor(public payload: Customer) {}
}

export class UpdateCustomerSuccess implements Action {
  public readonly type = CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS;

  constructor(public payload: Customer) {}
}

export class UpdateCustomerFail implements Action {
  public readonly type = CustomerManagementActionTypes.UPDATE_CUSTOMER_FAIL;

  constructor(public error: string) {}
}

export class SetCustomerToEdit implements Action {
  public readonly type = CustomerManagementActionTypes.SET_CUSTOMER_ID_TO_EDIT;

  constructor(public payload: string) {}
}

export class ResetCustomerToEdit implements Action {
  public readonly type = CustomerManagementActionTypes.RESET_CUSTOMER_ID_TO_EDIT;
}

export class UnarchiveCustomer implements Action {
  public readonly type = CustomerManagementActionTypes.UNARCHIVE_CUSTOMER;

  constructor(public payload: string) {}
}

export class UnarchiveCustomerSuccess implements Action {
  public readonly type = CustomerManagementActionTypes.UNARCHIVE_CUSTOMER_SUCCESS;

  constructor(public payload: Status) {}
}

export class UnarchiveCustomerFail implements Action {
  public readonly type = CustomerManagementActionTypes.UNARCHIVE_CUSTOMER_FAIL;

  constructor(public error: string) {}
}

export type CustomerManagementActions =
  | CreateCustomer
  | CreateCustomerSuccess
  | CreateCustomerFail
  | LoadCustomers
  | LoadCustomersFail
  | LoadCustomersSuccess
  | DeleteCustomer
  | DeleteCustomerSuccesss
  | DeleteCustomerFail
  | UpdateCustomer
  | UpdateCustomerSuccess
  | UpdateCustomerFail
  | SetCustomerToEdit
  | ResetCustomerToEdit
  | UnarchiveCustomer
  | UnarchiveCustomerSuccess
  | UnarchiveCustomerFail;
