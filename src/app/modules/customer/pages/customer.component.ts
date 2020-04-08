import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  showCustomerForm: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  activateCustomerForm(): boolean {
    this.showCustomerForm = true;
    return this.showCustomerForm;
  }
}
