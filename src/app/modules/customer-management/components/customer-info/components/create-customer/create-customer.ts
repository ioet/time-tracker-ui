import { CleanProjectTypes } from './../../../projects-type/store/project-type.actions';
import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { getCustomerUnderEdition } from './../../../../store/customer-management.selectors';
import { Customer } from 'src/app/modules/shared/models';
import {
  CustomerState,
  CreateCustomer,
  UpdateCustomer,
  ResetCustomerToEdit,
} from 'src/app/modules/customer-management/store';
import { LoadProjectTypes } from '../../../projects-type/store';
import { LoadCustomerProjects, CleanCustomerProjects } from '../../../projects/components/store/project.actions';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.html',
  styleUrls: ['./create-customer.scss'],
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  customerForm: FormGroup;
  @Input() areTabsActive: boolean;
  @Input() hasChange: boolean;
  @Output() hasChangedEvent = new EventEmitter<boolean>();
  @Output() changeValueAreTabsActives = new EventEmitter<boolean>();
  @Output() closeCustomerComponent = new EventEmitter<boolean>();
  customerToEdit: Customer;
  editSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<CustomerState>) {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.markTabsAsInactive();
    const customers$ = this.store.pipe(select(getCustomerUnderEdition));
    this.editSubscription = customers$.subscribe((customer) => {
      this.customerToEdit = customer;
      this.setDataToUpdate(this.customerToEdit);
    });
  }

  ngOnDestroy() {
    this.areTabsActive = false;
    this.editSubscription.unsubscribe();
  }

  onSubmit(customerData) {
    if (this.customerToEdit) {
      const customer = {
        ...customerData,
        id: this.customerToEdit.id,
      };
      this.store.dispatch(new UpdateCustomer(customer));
    } else {
      this.store.dispatch(new CreateCustomer(customerData));
    }
    this.areTabsActive = true;
    this.changeValueAreTabsActives.emit(this.areTabsActive);
    this.closeCustomerComponent.emit(false);
  }

  setDataToUpdate(customerData: Customer) {
    if (customerData) {
      this.store.dispatch(new LoadProjectTypes(customerData.id));
      this.store.dispatch(new LoadCustomerProjects(customerData.id));
      this.changeValueAreTabsActives.emit(true);
      this.customerForm.setValue({
        name: customerData.name,
        description: customerData.description,
      });
    } else {
      this.store.dispatch(new CleanProjectTypes());
      this.store.dispatch(new CleanCustomerProjects());
      this.markTabsAsInactive();
      this.customerForm.reset();
    }
    this.hasChangedEvent.emit((this.hasChange = false));
  }

  markTabsAsInactive() {
    this.areTabsActive = false;
    this.changeValueAreTabsActives.emit(this.areTabsActive);
  }

  get name() {
    return this.customerForm.get('name');
  }

  resetCustomerForm() {
    this.customerForm.reset();
    this.store.dispatch(new ResetCustomerToEdit());
    this.closeCustomerComponent.emit(false);
    this.hasChangedEvent.emit(this.hasChange = false);
  }

  onInputChangeCustomer(searchValue: string): void {
    return searchValue ? this.hasChangedEvent.emit(this.hasChange = true) :
      this.hasChangedEvent.emit(this.hasChange = false);
  }
}
