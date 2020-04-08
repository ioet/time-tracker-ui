import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCustomerComponent } from './input-customer';

describe('InputCustomerComponent', () => {
  let component: InputCustomerComponent;
  let fixture: ComponentFixture<InputCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputCustomerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
