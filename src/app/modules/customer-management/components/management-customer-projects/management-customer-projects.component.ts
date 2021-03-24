import { getCustomerUnderEdition } from './../../store/customer-management.selectors';
import { Customer } from 'src/app/modules/shared/models';
import { Store, select } from '@ngrx/store';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-customer-projects',
  templateUrl: './management-customer-projects.component.html',
  styleUrls: ['./management-customer-projects.component.scss'],
})
export class ManagementCustomerProjectsComponent implements OnInit {
  @Output() closeCustemerForm = new EventEmitter<boolean>();
  @Output() sendChanges = new EventEmitter<boolean>();
  areTabsActive: boolean;
  hasChanged: boolean;
  activeTab: string;
  customerName: string;

  constructor(private store: Store<Customer>) { }

  ngOnInit(): void {
    const customers$ = this.store.pipe(select(getCustomerUnderEdition));
    customers$.subscribe((customer) => {
      if (customer) {
        this.customerName = customer.name;
      } else {
        this.customerName = undefined;
      }
    });
  }

  activeTabs($areTabsActive: boolean) {
    setTimeout(() => {
      this.areTabsActive = $areTabsActive;
      this.activeTab = 'customer-information';
    }, 1);
  }

  closeCustomer(event) {
    this.closeCustemerForm.emit(event);
  }

  showTab(activeTab: string) {
    this.activeTab = activeTab;
  }

  getChanges($value: boolean) {
    this.hasChanged = $value;
    this.sendChanges.emit($value);
  }
}
