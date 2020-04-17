import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CustomerState, CreateCustomer } from 'src/app/modules/customer-management/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getStatusMessage } from 'src/app/modules/customer-management/store/customer-management.selectors';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.html',
  styleUrls: ['./create-customer.scss'],
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  customerForm: FormGroup;
  @Input() isActiveItemTabs: boolean;
  @Output() changeValueIsActiveItemTabs = new EventEmitter<boolean>();
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
      console.log(valueMessage);
    });
  }

  ngOnDestroy() {
    this.isActiveItemTabs = false;
    this.saveSubscription.unsubscribe();
  }

  onSubmit(customerData) {
    this.store.dispatch(new CreateCustomer(customerData));
    this.showAlert = true;
  }

  setStatusOnScreen(message: string) {
    if (message === 'Customer create successfully!') {
      this.messageToShow = message;
      this.isActiveItemTabs = true;
      this.changeValueIsActiveItemTabs.emit(this.isActiveItemTabs);
    } else if (message === 'Something went wrong creating customer!') {
      this.messageToShow = message;
      this.isActiveItemTabs = false;
      this.changeValueIsActiveItemTabs.emit(this.isActiveItemTabs);
    }
  }

  resetCustomerForm() {
    this.showAlert = false;
    this.customerForm.reset();
  }
}
