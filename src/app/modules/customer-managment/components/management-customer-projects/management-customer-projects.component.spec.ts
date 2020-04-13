import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomerProjectsComponent } from './management-customer-projects.component';

describe('ManagmentCustomerProjectsComponent', () => {
  let component: ManagementCustomerProjectsComponent;
  let fixture: ComponentFixture<ManagementCustomerProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementCustomerProjectsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCustomerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should create', () => {
    expect(component).toBeTruthy();
  });
});
