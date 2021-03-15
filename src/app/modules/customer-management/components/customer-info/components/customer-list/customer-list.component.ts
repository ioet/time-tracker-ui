import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { getIsLoading } from 'src/app/modules/customer-management/store/customer-management.selectors';
import { Customer } from './../../../../../shared/models/customer.model';
import {
  CustomerManagementActionTypes,
  DeleteCustomer,
  LoadCustomers,
  SetCustomerToEdit,
} from './../../../../store/customer-management.actions';
import { ResetProjectToEdit } from '../../../projects/components/store/project.actions';
import { ResetProjectTypeToEdit } from '../../../projects-type/store';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() showCustomerForm: boolean;
  @Input() haveChanges: boolean;
  @Output() changeValueShowCustomerForm = new EventEmitter<boolean>();
  @Input()
  customers: Customer[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  loadCustomersSubscription: Subscription;
  changeCustomerSubscription: Subscription;
  showModal = false;
  idToDelete: string;
  message: string;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<Customer>, private actionsSubject$: ActionsSubject) {
    this.isLoading$ = store.pipe(delay(0), select(getIsLoading));
  }

  ngOnInit(): void {
    this.dtOptions = {
      scrollY: '325px',
      paging: false,
      responsive: true,
    };
    this.loadCustomersSubscription = this.actionsSubject$
      .pipe(filter((action: any) => action.type === CustomerManagementActionTypes.LOAD_CUSTOMERS_SUCCESS))
      .subscribe((action) => {
        this.customers = action.payload;
        this.rerenderDataTable();
      });
    this.changeCustomerSubscription = this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === CustomerManagementActionTypes.DELETE_CUSTOMER_SUCCESS ||
            action.type === CustomerManagementActionTypes.UPDATE_CUSTOMER_SUCCESS ||
            action.type === CustomerManagementActionTypes.CREATE_CUSTOMER_SUCCESS
        )
      )
      .subscribe((action) => {
        this.store.dispatch(new LoadCustomers());
        this.showCustomerForm = false;
      });
    this.store.dispatch(new LoadCustomers());
  }

  ngAfterViewInit(): void {
    this.rerenderDataTable();
  }

  ngOnDestroy() {
    this.loadCustomersSubscription.unsubscribe();
    this.changeCustomerSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  editCustomer(customerId: string) {
    if (this.haveChanges === true) {
      this.message = `Do you have changes in a client, do you want to discard them?`;
      this.showModal = true;
    } else {
      this.showCustomerForm = true;
      this.showModal = false;
      this.changeValueShowCustomerForm.emit(this.showCustomerForm);
      this.resetProjectFieldsToEdit();
      this.store.dispatch(new SetCustomerToEdit(customerId));
    }
  }

  testMessage(customerId: string) {
    this.showCustomerForm = true;
    this.showModal = false;
    this.haveChanges = null;
    this.changeValueShowCustomerForm.emit(this.showCustomerForm);
    this.resetProjectFieldsToEdit();
    this.store.dispatch(new SetCustomerToEdit(customerId));
  }

  private resetProjectFieldsToEdit() {
    this.store.dispatch(new ResetProjectToEdit());
    this.store.dispatch(new ResetProjectTypeToEdit());
  }

  deleteCustomer() {
    this.store.dispatch(new DeleteCustomer(this.idToDelete));
    this.showModal = false;
  }

  private rerenderDataTable(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstances: DataTables.Api) => {
        dtInstances.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }

  openModal(item: Customer) {
    this.idToDelete = item.id;
    this.message = `Are you sure you want to delete ${item.name}?`;
    this.showModal = true;
  }
}
