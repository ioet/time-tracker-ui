import { Store } from '@ngrx/store';
import { Customer } from 'src/app/modules/shared/models';
import { SetCustomerToEdit } from 'src/app/modules/customer-management/store';
import { Component } from '@angular/core';
import { scrollToCustomerForm } from '../components/customer-info/components/customer-list/customer-list.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  showCustomerForm = false;
  hasChangeComponent = false;

  activityName: string;

  constructor(private store: Store<Customer>) { }

  activateCustomerForm() {
    this.store.dispatch(new SetCustomerToEdit(null));
    this.showCustomerForm = true;
    scrollToCustomerForm();
  }

  closeCustomerForm(event) {
    this.showCustomerForm = event;
  }

  getChangesInputs(event) {
    this.hasChangeComponent = event;
  }

}
