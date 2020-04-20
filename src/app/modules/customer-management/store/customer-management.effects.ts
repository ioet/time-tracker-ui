import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from './customer-management.actions';
import { CustomerService } from '../services/customer.service';
import { map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private customerService: CustomerService) {}

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.LOAD_CUSTOMERS),
    mergeMap(() =>
      this.customerService.getCustomers().pipe(
        map((customers) => {
          return new actions.LoadCustomersSuccess(customers);
        }),
        catchError((error) => of(new actions.LoadCustomersFail(error)))
      )
    )
  );

  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.CREATE_CUSTOMER),
    map((action: actions.CreateCustomer) => action.payload),
    mergeMap((customer) =>
      this.customerService.createCustomer(customer).pipe(
        map((customerData) => {
          return new actions.CreateCustomerSuccess(customerData);
        }),
        catchError((error) => of(new actions.CreateCustomerFail(error)))
      )
    )
  );
}
