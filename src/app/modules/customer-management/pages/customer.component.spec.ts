import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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
});
