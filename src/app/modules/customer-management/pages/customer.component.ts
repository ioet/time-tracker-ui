import { Store } from '@ngrx/store';
import { Customer } from 'src/app/modules/shared/models';
import { SetCustomerToEdit } from 'src/app/modules/customer-management/store';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  showCustomerForm = false;
  haveChanges = false;

  activityName: string;

  constructor(private store: Store<Customer>) { }

  activateCustomerForm() {
    this.store.dispatch(new SetCustomerToEdit(null));
    this.showCustomerForm = true;
  }
  closeCustomerForm(event) {
    this.showCustomerForm = event;
  }

  getChangesInputs(event) {
    this.haveChanges = event;
    console.log('customer.component sending changes', this.haveChanges);
  }

}
