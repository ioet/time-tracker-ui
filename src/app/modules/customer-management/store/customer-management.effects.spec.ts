import { Customer } from '../../shared/models/customer.model';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { CustomerManagementActionTypes } from './customer-management.actions';
import { CustomerEffects } from './customer-management.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { INFO_SAVED_SUCCESSFULLY, INFO_DELETE_SUCCESSFULLY } from '../../shared/messages';

describe('CustomerEffects', () => {
  let actions$: Observable<Action>;
  let effects: CustomerEffects;
  let service: CustomerService;
  let toastrService;
  const customer: Customer = { id: 'id', name: 'name', description: 'description' };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerEffects, provideMockActions(() => actions$)],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
    });
    effects = TestBed.inject(CustomerEffects);
    service = TestBed.inject(CustomerService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('SHOULD be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('action type is LOAD_CUSTOMERS_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: CustomerManagementActionTypes.LOAD_CUSTOMERS });
    const serviceSpy = spyOn(service, 'getCustomers');
    serviceSpy.and.returnValue(of(customer));

    effects.loadCustomers$.subscribe((action) => {
      expect(action.type).toEqual(CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS);
    });
  });

  it('action type is LOAD_CUSTOMERS_FAIL when service fail in execution', async () => {
    actions$ = of({ type: CustomerManagementActionTypes.LOAD_CUSTOMERS });
    const serviceSpy = spyOn(service, 'getCustomers');
    serviceSpy.and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.loadCustomers$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(CustomerManagementActionTypes.LOAD_CUSTOMERS_FAIL);
    });
  });

  it('action type is UPDATE_CUSTOMERS_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: CustomerManagementActionTypes.UPDATE_CUSTOMER, customer });
    spyOn(toastrService, 'success');
    spyOn(service, 'updateCustomer').and.returnValue(of(customer));

    effects.updateCustomer$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS);
    });
  });

  it('action type is UPDATE_CUSTOMERS_FAIL when service fail in execution', async () => {
    actions$ = of({ type: CustomerManagementActionTypes.UPDATE_CUSTOMER, customer });
    spyOn(toastrService, 'error');
    spyOn(service, 'updateCustomer').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.updateCustomer$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(CustomerManagementActionTypes.UPDATE_CUSTOMER_FAIL);
    });
  });

  it('action type is CREATE_CUSTOMER_SUCCESS when service is executed sucessfully', async () => {
    actions$ = of({ type: CustomerManagementActionTypes.CREATE_CUSTOMER, payload: customer });
    spyOn(toastrService, 'success');
    spyOn(service, 'createCustomer').and.returnValue(of(customer));

    effects.createCustomer$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS);
    });
  });

  it('action type is CREATE_CUSTOMER_FAIL when service fail in execution', async () => {
    actions$ = of({ type: CustomerManagementActionTypes.CREATE_CUSTOMER, payload: customer });
    spyOn(toastrService, 'error');
    spyOn(service, 'createCustomer').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.createCustomer$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(CustomerManagementActionTypes.CREATE_CUSTOMER_FAIL);
    });
  });

  it('action type is DELETE_CUSTOMER_SUCCESS when service is executed sucessfully', async () => {
    const customerId = 'customerId';
    actions$ = of({ type: CustomerManagementActionTypes.DELETE_CUSTOMER, customerId });
    spyOn(toastrService, 'success');
    spyOn(service, 'deleteCustomer').and.returnValue(of({}));

    effects.deleteCustomer$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_DELETE_SUCCESSFULLY);
      expect(action.type).toEqual(CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS);
    });
  });

  it('action type is DELETE_CUSTOMER_FAIL when service fail in execution', async () => {
    const customerId = 'customerId';
    actions$ = of({ type: CustomerManagementActionTypes.DELETE_CUSTOMER, customerId });
    spyOn(toastrService, 'error');
    spyOn(service, 'deleteCustomer').and.returnValue(throwError({ error: { message: 'fail!' } }));

    effects.deleteCustomer$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(CustomerManagementActionTypes.DELETE_CUSTOMER_FAIL);
    });
  });

  it('action type is UNARCHIVE_CUSTOMER_SUCCESS when service is executed sucessfully', async () => {
    const customerId = 'customerId';
    actions$ = of({ type: CustomerManagementActionTypes.UNARCHIVE_CUSTOMER, customerId });
    spyOn(service, 'updateCustomer').and.returnValue(of(customer));
    spyOn(toastrService, 'success');

    effects.unarchiveCustomer$.subscribe((action) => {
      expect(toastrService.success).toHaveBeenCalledWith(INFO_SAVED_SUCCESSFULLY);
      expect(action.type).toEqual(CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS);
    });
  });

  it('action type is UNARCHIVE_CUSTOMER_FAIL when service fail in execution', async () => {
    actions$ = of({ type: CustomerManagementActionTypes.UNARCHIVE_CUSTOMER, customer });
    spyOn(service, 'updateCustomer').and.returnValue(throwError({ error: { message: 'fail!' } }));
    spyOn(toastrService, 'error');

    effects.unarchiveCustomer$.subscribe((action) => {
      expect(toastrService.error).toHaveBeenCalled();
      expect(action.type).toEqual(CustomerManagementActionTypes.UPDATE_CUSTOMER_FAIL);
    });
  });
});
