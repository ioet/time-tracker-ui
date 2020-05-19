import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {NgxPaginationModule} from 'ngx-pagination';
import {CustomerListComponent} from './customer-list.component';
import {allCustomers} from './../../../../store/customer-management.selectors';
import {
  CustomerState,
  SetCustomerToEdit,
  DeleteCustomer,
  LoadCustomers,
  CustomerManagementActionTypes
} from 'src/app/modules/customer-management/store';
import {DataTablesModule} from 'angular-datatables';
import {ActionsSubject} from '@ngrx/store';

describe('CustomerTableListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let store: MockStore<CustomerState>;
  const actionSub: ActionsSubject = new ActionsSubject();

  const state = {
    data: [{tenant_id: 'id', name: 'name', description: 'description'}],
    isLoading: false,
    message: '',
    customerIdToEdit: '',
    customerId: ''
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule, DataTablesModule],
      declarations: [CustomerListComponent],
      providers: [
        provideMockStore({initialState: state}),
        {provide: ActionsSubject, useValue: actionSub}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    store.setState(state);
    fixture.detectChanges();

  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('when the component is initialized the load customer action is triggered', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(new LoadCustomers());
  });

  it('onClick edit, dispatch SetCustomerToEdit and enable customer form', () => {
    spyOn(store, 'dispatch');

    component.editCustomer('1');

    expect(store.dispatch).toHaveBeenCalledWith(new SetCustomerToEdit('1'));
    expect(component.showCustomerForm).toBeTruthy();
  });

  it('onClick delete, dispatch DeleteCustomer', () => {
    spyOn(store, 'dispatch');

    component.deleteCustomer('1');

    expect(store.dispatch).toHaveBeenCalledWith(new DeleteCustomer('1'));
  });

  const params = [
    {actionName: 'delete', actionType: CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS},
    {actionName: 'update', actionType: CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS},
    {actionName: 'create', actionType: CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS}
  ];

  params.map(param =>
    it(`on success ${param.actionName} customer, the load all customer action should be triggered`, () => {
      const actionSubject = TestBed.get(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType
      };
      spyOn(store, 'dispatch');

      actionSubject.next(action);

      expect(store.dispatch).toHaveBeenCalledWith(new LoadCustomers());
    }));

  params.map(param =>
    it(`on success ${param.actionName} customer, the customer form should be disabled`, () => {
      const actionSubject = TestBed.get(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType
      };
      actionSubject.next(action);

      expect(component.showCustomerForm).toBe(false);
    }));

  // TODO Make this test work. This is having problems with jquery integration
  // it('on success load customers, the customer list should be populated', () => {
  //   const actionSubject = TestBed.get(ActionsSubject) as ActionsSubject;
  //   const action = {
  //     type: CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS,
  //     payload: state.data
  //   };
  //
  //   actionSubject.next(action);
  //
  //   expect(component.customers).toEqual(state.data);
  // });

  afterEach(() => {
    component.dtTrigger.unsubscribe();
    component.changeCustomerSubscription.unsubscribe();
    component.loadCustomersSubscription.unsubscribe();
    fixture.destroy();
  });
});
