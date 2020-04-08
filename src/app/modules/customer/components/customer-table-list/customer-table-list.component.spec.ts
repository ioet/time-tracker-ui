import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTableListComponent } from './customer-table-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('CustomerTableListComponent', () => {
  let component: CustomerTableListComponent;
  let fixture: ComponentFixture<CustomerTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [CustomerTableListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTableListComponent);
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
