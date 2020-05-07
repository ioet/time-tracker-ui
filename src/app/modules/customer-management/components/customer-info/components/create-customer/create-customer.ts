import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { getCustomerById } from './../../../../store/customer-management.selectors';
import { Customer } from 'src/app/modules/shared/models';
import {
  CustomerState,
  CreateCustomer,
  UpdateCustomer,
  ResetCustomerToEdit,
} from 'src/app/modules/customer-management/store';
import { LoadProjectTypes } from '../../../projects-type/store';
import { LoadCustomerProjects } from '../../../projects/components/store/project.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.html',
  styleUrls: ['./create-customer.scss'],
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  customerForm: FormGroup;
  @Input() areTabsActive: boolean;
  @Output() changeValueAreTabsActives = new EventEmitter<boolean>();
  customerToEdit: Customer;
  editSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<CustomerState>,
              private toastrService: ToastrService) {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.areTabsActive = true;
    this.changeValueAreTabsActives.emit(this.areTabsActive);
    const customers$ = this.store.pipe(select(getCustomerById));
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
    this.toastrService.success('Customer information saved successfully');
    this.areTabsActive = true;
    this.changeValueAreTabsActives.emit(this.areTabsActive);
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
    }
  }

  get name() {
    return this.customerForm.get('name');
  }

  get description() {
    return this.customerForm.get('description');
  }

  resetCustomerForm() {
    this.customerForm.reset();
    this.store.dispatch(new ResetCustomerToEdit());
  }
}
