import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerListComponent } from './customer-list.component';
import {
  CustomerManagementActionTypes,
  CustomerState,
  DeleteCustomer,
  LoadCustomers,
  ResetCustomerToEdit,
  SetCustomerToEdit,
} from 'src/app/modules/customer-management/store';
import { DataTablesModule } from 'angular-datatables';
import { ActionsSubject } from '@ngrx/store';
import { ResetProjectToEdit, SetProjectToEdit } from '../../../projects/components/store/project.actions';
import { ResetProjectTypeToEdit, SetProjectTypeToEdit } from '../../../projects-type/store';

describe('CustomerTableListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let store: MockStore<CustomerState>;
  const actionSub: ActionsSubject = new ActionsSubject();

  const state = {
    data: [{ tenant_id: 'id', name: 'name', description: 'description', status: 'inactive' }],
    isLoading: false,
    message: '',
    customerIdToEdit: '',
    customerId: '',
  };

  const btnProps = [
    {
      key: 'active',
      _status: false,
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo:  'fa-check',
      btnName: 'Active',
      iconColor: 'text-success'
    },
    {
      key: 'inactive',
      _status: true,
      btnColor: 'btn-white',
      btnIcon: 'fa-circle',
      btnIconTwo:  'fa-check',
      btnName: 'Inactive',
      iconColor: 'text-danger'
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxPaginationModule, DataTablesModule],
        declarations: [CustomerListComponent],
        providers: [provideMockStore({ initialState: state }), { provide: ActionsSubject, useValue: actionSub }],
      }).compileComponents();
    })
  );

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

  it('Onclick Edit, if there are changes, the modal must be presented ', () => {
    component.hasChange = true;
    const expectMessage = 'Do you have changes in a client, do you want to discard them?';

    component.editCustomer('1');

    expect(component.message).toEqual(expectMessage);
    expect(component.showModal).toBeTrue();
  });

  it('onClick edit, if there are not have changes dispatch SetCustomerToEdit, enable customer form and hidden modal', () => {
    component.hasChange = false;

    spyOn(store, 'dispatch');

    component.editCustomer('1');

    expect(store.dispatch).toHaveBeenCalledWith(new SetCustomerToEdit('1'));
    expect(component.showCustomerForm).toBeTruthy();
    expect(component.showModal).toBeFalse();
  });

  it('onClick edit, dispatch clean Forms in project and project type', () => {
    spyOn(store, 'dispatch');

    component.editCustomer('1');

    expect(store.dispatch).toHaveBeenCalledWith(new SetProjectToEdit(null));
    expect(store.dispatch).toHaveBeenCalledWith(new SetProjectTypeToEdit(null));
    expect(store.dispatch).toHaveBeenCalledWith(new ResetProjectToEdit());
    expect(store.dispatch).toHaveBeenCalledWith(new ResetProjectTypeToEdit());
  });

  it('when you click close modal, you should close the modal, discard the current changes and load a new client for edit', () => {
    spyOn(component.changeValueShowCustomerForm, 'emit');
    spyOn(store, 'dispatch');

    component.editCustomer('1');
    component.closeModal();

    expect(component.showModal).toBeFalse();
    expect(component.changeValueShowCustomerForm.emit).toHaveBeenCalledWith(true);
    expect(store.dispatch).toHaveBeenCalledWith(new SetCustomerToEdit('1'));
  });

  it('when you click close modal, if the idToEdit is equal currentCustomerIdToEdit should dispatch ResetCustomerToEdit', () => {

    spyOn(store, 'dispatch');

    component.idToEdit = '1';
    component.currentCustomerIdToEdit = '1';
    component.closeModal();

    expect(store.dispatch).toHaveBeenCalledWith(new ResetCustomerToEdit());
  });

  it('onClick delete, dispatch DeleteCustomer', () => {
    spyOn(store, 'dispatch');
    component.idToDelete = '1';
    component.deleteCustomer();

    expect(store.dispatch).toHaveBeenCalledWith(new DeleteCustomer('1'));
  });

  it('onClick delete, if idToDelete is equal to currentCustomerIdToEdit should dispatch ResetCustomerToEdit', () => {

    spyOn(store, 'dispatch');

    component.idToDelete = '1';
    component.currentCustomerIdToEdit = '1';
    component.deleteCustomer();

    expect(store.dispatch).toHaveBeenCalledWith(new ResetCustomerToEdit());
  });

  const params = [
    { actionName: 'delete', actionType: CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS },
    { actionName: 'update', actionType: CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS },
    { actionName: 'create', actionType: CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS },
  ];

  params.map((param) =>
    it(`on success ${param.actionName} customer, the load all customer action should be triggered`, () => {
      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType,
      };
      spyOn(store, 'dispatch');

      actionSubject.next(action);

      expect(store.dispatch).toHaveBeenCalledWith(new LoadCustomers());
    })
  );

  params.map((param) =>
    it(`on success ${param.actionName} customer, the customer form should be disabled`, () => {
      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType,
      };
      actionSubject.next(action);

      expect(component.showCustomerForm).toBe(false);
    })
  );

  it('on success load customers, the customer list should be populated', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS,
      payload: state.data,
    };

    actionSubject.next(action);

    const StateWithBtnProperties = state.data.map((customer) => {
      const addProps = btnProps.find((prop) => prop.key === component.setActive(customer.status));
      return { ...customer, ...addProps };
    });

    expect(component.customers).toEqual(StateWithBtnProperties);
  });

  it('openModal should set on true and display "Are you sure you want to disable customer"', () => {
    const message = 'Are you sure you want to disable name?';
    const itemData = {
      id: '1',
      name: 'name',
      description: 'description',
      status: 'active',
      key: 'active',
      _status: false,
      btnColor: 'btn-danger',
      btnIcon: 'fa-arrow-circle-down',
      btnName: 'Archive',
    };

    component.openModal(itemData);
    expect(component.showModal).toBeTrue();
    expect(component.message).toBe(message);
  });

  it('switchStatus should call openModal() on item.status = activate', () => {
    const itemData = {
      id: '1',
      name: 'name',
      description: 'description',
      status: 'activate',
      key: 'activate',
      _status: false,
      btnColor: 'btn-danger',
      btnIcon: 'fa-arrow-circle-down',
      btnIconTwo: 'fa-check',
      btnName: 'Archive',
      iconColor: 'text-success'
    };

    spyOn(component, 'openModal');
    component.switchStatus(itemData);
    expect(component.openModal).toHaveBeenCalled();
  });

  it('switchStatus should set showModal false when item.status = inactive', () => {
    const itemData = {
      id: '1',
      name: 'name',
      description: 'description',
      status: 'inactive',
      key: 'inactive',
      _status: true,
      btnColor: 'btn-primary',
      btnIcon: 'fa-arrow-circle-up',
      btnIconTwo:  'fa-check',
      btnName: 'Active',
      iconColor: 'text-danger'
    };

    component.switchStatus(itemData);
    expect(component.showModal).toBeFalse();
  });

  afterEach(() => {
    component.dtTrigger.unsubscribe();
    component.changeCustomerSubscription.unsubscribe();
    component.loadCustomersSubscription.unsubscribe();
    fixture.destroy();
  });
});
