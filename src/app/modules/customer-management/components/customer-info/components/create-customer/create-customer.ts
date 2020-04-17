import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { CustomerState, CreateCustomer } from 'src/app/modules/customer-management/store';
import { getStatusMessage } from 'src/app/modules/customer-management/store/customer-management.selectors';

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
  saveSubscription: Subscription;

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
  }

  ngOnDestroy() {
    this.areTabsActive = false;
    this.saveSubscription.unsubscribe();
  }

  onSubmit(customerData) {
    this.store.dispatch(new CreateCustomer(customerData));
    this.showAlert = true;
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
  }

  resetCustomerForm() {
    this.showAlert = false;
    this.customerForm.reset();
  }
}
