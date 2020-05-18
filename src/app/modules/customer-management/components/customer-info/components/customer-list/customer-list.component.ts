import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';

import { Subscription, Subject } from 'rxjs';
import { allCustomers } from './../../../../store/customer-management.selectors';
import { LoadCustomers, DeleteCustomer, SetCustomerToEdit } from './../../../../store/customer-management.actions';
import { Customer } from './../../../../../shared/models/customer.model';
import { ITEMS_PER_PAGE } from 'src/environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit {
  initPage1 = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  @Input() showCustomerForm: boolean;
  @Output() changeValueShowCustomerForm = new EventEmitter<boolean>();

  customers: Customer[] = [];
  customerSubscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized = false;

  constructor(private store: Store<Customer>, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      scrollY: '250px',
      paging: false,
    };

    this.store.dispatch(new LoadCustomers());
    const customers$ = this.store.pipe(select(allCustomers));
    this.customerSubscription = customers$.subscribe((response) => {
      this.customers = response ? response : [];
      this.rerender();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
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

  rerender(): void {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
    }
  }
}
