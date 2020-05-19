import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
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
export class CustomerListComponent implements OnInit, OnDestroy {

  @Input() showCustomerForm: boolean;
  @Output() changeValueShowCustomerForm = new EventEmitter<boolean>();
  @Input()
  customers: Customer[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;
  private actionsSubscription: Subscription;

  constructor(private store: Store<Customer>, private actionsSubject$: ActionsSubject) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      scrollY: '290px',
      paging: false
    };
    this.actionsSubscription = this.actionsSubject$.pipe(
      filter((action: any) => (
          action.type === CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS
        )
      )
    ).subscribe((action) => {
      this.customers = action.payload;
      this.rerenderDataTable();
    });

    this.actionsSubscription = this.actionsSubject$.pipe(
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

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  editCustomer(customerId: string) {
    this.showCustomerForm = true;
    this.changeValueShowCustomerForm.emit(this.showCustomerForm);
    this.store.dispatch(new SetCustomerToEdit(customerId));
  }

  deleteCustomer(customerId: string) {
    this.store.dispatch(new DeleteCustomer(customerId));
  }

  private rerenderDataTable(): void {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
      this.isDtInitialized = true;
    }
  }
}
