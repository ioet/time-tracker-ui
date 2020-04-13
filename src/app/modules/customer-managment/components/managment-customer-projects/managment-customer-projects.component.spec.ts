import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentCustomerProjectsComponent } from './managment-customer-projects.component';

describe('ManagmentCustomerProjectsComponent', () => {
  let component: ManagmentCustomerProjectsComponent;
  let fixture: ComponentFixture<ManagmentCustomerProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagmentCustomerProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagmentCustomerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
