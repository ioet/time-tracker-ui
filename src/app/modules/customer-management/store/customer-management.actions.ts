import { Action } from '@ngrx/store';
import { Customer } from '../../shared/models/customer.model';

export enum CustomerManagementActionTypes {
  CREATE_CUSTOMER = '[CustomerManagement] CREATE_CUSTOMER',
  CREATE_CUSTOMER_SUCCESS = '[CustomerManagement] CREATE_CUSTOMER_SUCCESS',
  CREATE_CUSTOMER_FAIL = '[CustomerManagement] CREATE_CUSTOMER_FAIL',
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

export type CustomerManagementActions = CreateCustomer | CreateCustomerSuccess | CreateCustomerFail;
