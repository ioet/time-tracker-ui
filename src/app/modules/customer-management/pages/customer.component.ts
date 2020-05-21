import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  showCustomerForm = false;
  activityName: string;

  activateCustomerForm() {
    this.showCustomerForm = true;
  }
  closeCustomerForm(event) {
    this.showCustomerForm = event;
  }
}
