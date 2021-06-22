import { INFO_SAVED_SUCCESSFULLY, INFO_DELETE_SUCCESSFULLY } from '../../shared/messages';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../services/customer.service';
import * as actions from './customer-management.actions';
import { Status } from '../../shared/models/customer.model';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) { }

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.LOAD_CUSTOMERS),
    mergeMap(() =>
      this.customerService.getCustomers().pipe(
        map((customers) => {
          return new actions.LoadCustomersSuccess(customers);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.LoadCustomersFail(error));
        }
        )
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
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.CreateCustomerSuccess(customerData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.CreateCustomerFail(error));
        })
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.DELETE_CUSTOMER),
    map((action: actions.DeleteCustomer) => action.customerId),
    mergeMap((customerId) =>
      this.customerService.deleteCustomer(customerId).pipe(
        map(() => {
          this.toastrService.success(INFO_DELETE_SUCCESSFULLY);
          return new actions.DeleteCustomerSuccesss(customerId);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.DeleteCustomerFail(error));
        })
      )
    )
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.UPDATE_CUSTOMER),
    map((action: actions.UpdateCustomer) => action.payload),
    mergeMap((customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map((customerData) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.UpdateCustomerSuccess(customerData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateCustomerFail(error));
        })
      )
    )
  );

  @Effect()
  unarchiveCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.CustomerManagementActionTypes.UNARCHIVE_CUSTOMER),
    map((action: actions.UnarchiveCustomer) => ({
      id: action.payload,
      status: 'active',
    })),
    mergeMap((customer: Status) =>
      this.customerService.updateCustomer(customer).pipe(
        map((customerData) => {
          this.toastrService.success(INFO_SAVED_SUCCESSFULLY);
          return new actions.UpdateCustomerSuccess(customerData);
        }),
        catchError((error) => {
          this.toastrService.error(error.error.message);
          return of(new actions.UpdateCustomerFail(error));
        })
      )
    )
  );
}
