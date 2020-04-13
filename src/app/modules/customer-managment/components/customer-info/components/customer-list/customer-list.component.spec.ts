import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('CustomerTableListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [CustomerListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeShowCustomerForm should listen form changes', () => {
    component.showCustomerForm = true;
    spyOn(component.changeShowCustomerForm, 'emit');
    component.activateCustomerForm();
    expect(component.changeShowCustomerForm.emit).toHaveBeenCalled();
  });
});
