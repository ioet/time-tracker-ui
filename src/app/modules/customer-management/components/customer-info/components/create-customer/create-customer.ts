import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerState, CreateCustomer } from 'src/app/modules/customer-management/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.html',
  styleUrls: ['./create-customer.scss'],
})
export class CreateCustomerComponent {
  customerForm: FormGroup;
  @Input() isActiveItemTabs: boolean;
  @Output() changeValueIsActiveItemTabs = new EventEmitter<boolean>();
  showSuccessAlert = false;
  messageToShow = '';
  response = '';

  constructor(private formBuilder: FormBuilder, private store: Store<CustomerState>) {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit(customerData) {
    this.store.dispatch(new CreateCustomer(customerData));
    this.store.subscribe((state) => {
      this.response = Object.values(state)[2].message;
      if (this.response === 'Data create successfully!' || undefined) {
        this.isActiveItemTabs = true;
        this.changeValueIsActiveItemTabs.emit(this.isActiveItemTabs);
        this.messageToShow = this.response;
      } else {
        this.messageToShow = this.response;
      }
    });
    this.messageToShow = '';
  }

  resetCustomerForm() {
    this.customerForm.reset();
  }
}
