import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {NgxPaginationModule} from 'ngx-pagination';
import {CustomerListComponent} from './customer-list.component';
import {allCustomers} from './../../../../store/customer-management.selectors';
import {CustomerState, SetCustomerToEdit, DeleteCustomer, LoadCustomers} from 'src/app/modules/customer-management/store';
import {DataTablesModule} from 'angular-datatables';

describe('CustomerTableListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let store: MockStore<CustomerState>;
  let mockCustomerSelector;

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
        provideMockStore({initialState: state})
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);
    mockCustomerSelector = store.overrideSelector(allCustomers, state.data);
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

  afterEach(() => {
    fixture.destroy();
  });
});
