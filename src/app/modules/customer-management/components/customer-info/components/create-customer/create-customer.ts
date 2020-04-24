import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { getStatusMessage, getCustomerById } from './../../../../store/customer-management.selectors';
import { Customer } from 'src/app/modules/shared/models';
import {
  CustomerState,
  CreateCustomer,
  LoadCustomers,
  UpdateCustomer,
  ResetCustomerToEdit,
} from 'src/app/modules/customer-management/store';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.html',
  styleUrls: ['./create-customer.scss'],
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  customerForm: FormGroup;
  @Input() areTabsActive: boolean;
  @Output() changeValueAreTabsActives = new EventEmitter<boolean>();
  showAlert = false;
  messageToShow = '';
  customerToEdit: Customer;
  saveSubscription: Subscription;
  editSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<CustomerState>) {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    const messages$ = this.store.pipe(select(getStatusMessage));
    this.saveSubscription = messages$.subscribe((valueMessage) => {
      this.setStatusOnScreen(valueMessage);
    });

    const customers$ = this.store.pipe(select(getCustomerById));
    this.editSubscription = customers$.subscribe((customer) => {
      this.customerToEdit = customer;
      this.setDataToUpdate(this.customerToEdit);
    });
  }

  ngOnDestroy() {
    this.areTabsActive = false;
    this.saveSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }

  onSubmit(customerData) {
    if (this.customerToEdit) {
      const customer = {
        ...customerData,
        id: this.customerToEdit.id,
      };
      this.store.dispatch(new UpdateCustomer(customer));
      this.customerForm.reset();
    } else {
      this.store.dispatch(new CreateCustomer(customerData));
      this.store.dispatch(new LoadCustomers());
    }
    this.showAlert = true;
    setTimeout(() => (this.showAlert = false), 3000);
  }

  setStatusOnScreen(message: string) {
    if (message === 'Customer created successfully!') {
      this.messageToShow = message;
      this.areTabsActive = true;
      this.changeValueAreTabsActives.emit(this.areTabsActive);
    } else if (message === 'An error occurred, try again later.') {
      this.messageToShow = message;
      this.areTabsActive = false;
      this.changeValueAreTabsActives.emit(this.areTabsActive);
    }
    this.messageToShow = message;
  }

  setDataToUpdate(customerData: Customer) {
    if (customerData) {
      this.changeValueAreTabsActives.emit(true);
      this.customerForm.setValue({
        name: customerData.name,
        description: customerData.description,
      });
    }
  }

  resetCustomerForm() {
    this.customerForm.reset();
    this.store.dispatch(new ResetCustomerToEdit());
  }
}
