import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  showCustomerForm = false;

  constructor() {}

  activateCustomerForm(): boolean {
    this.showCustomerForm = true;
    return this.showCustomerForm;
  }
}
