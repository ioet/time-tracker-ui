import { SetCustomerToEdit } from 'src/app/modules/customer-management/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Customer } from 'src/app/modules/shared/models';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let store: MockStore<Customer>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('dispatches an action on activateCustomerForm', () => {
    spyOn(store, 'dispatch');

    component.activateCustomerForm();

    expect(store.dispatch).toHaveBeenCalledWith(new SetCustomerToEdit(null));
  });

  it('should change te value of var when method is called', () => {
    component.showCustomerForm = false;
    component.activateCustomerForm();

    expect(component.showCustomerForm).toBeTruthy();
  });

  it('should call close customer function', () => {
    component.closeCustomerForm(false);

    expect(component.showCustomerForm).toBe(false);
  });

  it('should call get changes inputs function', () => {
    component.getChangesInputs(true);

    expect(component.hasChangeComponent).toBe(true);
  });
});
