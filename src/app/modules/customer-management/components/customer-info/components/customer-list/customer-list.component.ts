import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { allCustomers, getStatusMessage } from './../../../../store/customer-management.selectors';
import { LoadCustomers, DeleteCustomer, SetCustomerToEdit } from './../../../../store/customer-management.actions';
import { Customer } from './../../../../../shared/models/customer.model';
import { ITEMS_PER_PAGE } from 'src/environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  initPage1 = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  @Input() showCustomerForm: boolean;
  @Output() changeValueShowCustomerForm = new EventEmitter<boolean>();

  customers: Customer[] = [];
  messageToShow = '';
  showAlert = false;
  customerSubscription: Subscription;
  customerMessageSubscription: Subscription;

  constructor(private store: Store<Customer>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadCustomers());
    const customers$ = this.store.pipe(select(allCustomers));
    this.customerSubscription = customers$.subscribe((response) => {
      this.customers = response;
    });

    const messages$ = this.store.pipe(select(getStatusMessage));
    this.customerMessageSubscription = messages$.subscribe((valueMessage) => {
      this.setStatusOnScreen(valueMessage);
    });
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
    this.customerMessageSubscription.unsubscribe();
  }

  setStatusOnScreen(message: string) {
    this.messageToShow = message;
  }

  editCustomer(customerId: string) {
    this.showCustomerForm = true;
    this.changeValueShowCustomerForm.emit(this.showCustomerForm);
    this.store.dispatch(new SetCustomerToEdit(customerId));
  }

  deleteCustomer(customerId: string) {
    this.showAlert = true;
    setTimeout(() => (this.showAlert = false), 3000);
    this.store.dispatch(new DeleteCustomer(customerId));
  }
}
