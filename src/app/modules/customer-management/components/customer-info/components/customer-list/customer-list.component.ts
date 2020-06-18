import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, AfterViewInit} from '@angular/core';
import {ActionsSubject, Store} from '@ngrx/store';

import {Subject, Subscription} from 'rxjs';
import {
  CustomerManagementActionTypes,
  DeleteCustomer,
  LoadCustomers,
  SetCustomerToEdit
} from './../../../../store/customer-management.actions';
import {Customer} from './../../../../../shared/models/customer.model';
import {filter} from 'rxjs/operators';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() showCustomerForm: boolean;
  @Output() changeValueShowCustomerForm = new EventEmitter<boolean>();
  @Input()
  customers: Customer[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  loadCustomersSubscription: Subscription;
  changeCustomerSubscription: Subscription;
  showModal = false;
  idToDelete: string;
  message: string;

  constructor(private store: Store<Customer>, private actionsSubject$: ActionsSubject) { }

  ngOnInit(): void {
    this.dtOptions = {
      scrollY: '290px',
      paging: false
    };
    this.loadCustomersSubscription = this.actionsSubject$.pipe(
      filter((action: any) => (
          action.type === CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS
        )
      )
    ).subscribe((action) => {
      this.customers = action.payload;
      this.rerenderDataTable();
    });

    this.changeCustomerSubscription = this.actionsSubject$.pipe(
      filter((action: any) => (
          action.type === CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS ||
          action.type === CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS ||
          action.type === CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS
        )
      )
    ).subscribe((action) => {
      this.store.dispatch(new LoadCustomers());
      this.showCustomerForm = false;
    });
    this.store.dispatch(new LoadCustomers());
  }

    ngAfterViewInit(): void {
    this.rerenderDataTable();
  }

  ngOnDestroy() {
    this.loadCustomersSubscription.unsubscribe();
    this.changeCustomerSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  editCustomer(customerId: string) {
    this.showCustomerForm = true;
    this.changeValueShowCustomerForm.emit(this.showCustomerForm);
    this.store.dispatch(new SetCustomerToEdit(customerId));
  }

  deleteCustomer() {
    this.store.dispatch(new DeleteCustomer(this.idToDelete));
    this.showModal = false;
  }

  private rerenderDataTable(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstances: DataTables.Api) => {
        dtInstances.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }

  openModal(item: Customer) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to delete ${item.name}?`;
    this.showModal = true;
  }
}
