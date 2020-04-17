import { allCustomers } from './../../../../store/customer-management.selectors';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { LoadCustomers } from './../../../../store/customer-management.actions';
import { Customer } from './../../../../../shared/models/customer.model';
import { ITEMS_PER_PAGE } from 'src/environments/environment';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  initPage1 = 1;
  itemsPerPage = ITEMS_PER_PAGE;

  customers: Customer[] = [];

  constructor(private store: Store<Customer>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadCustomers());
    const customers$ = this.store.pipe(select(allCustomers));
    customers$.subscribe((response) => {
      this.customers = response;
    });
  }

}
