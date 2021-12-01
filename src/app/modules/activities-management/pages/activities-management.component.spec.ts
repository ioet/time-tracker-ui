import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { by, By, element } from 'protractor';
import { ActivitiesManagementComponent } from './activities-management.component';

describe('ActivitiesManagementComponent', () => {
  let component: ActivitiesManagementComponent;
  let fixture: ComponentFixture<ActivitiesManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ActivitiesManagementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should check if is in development environment', () => {
    expect(component.showOptionInDevelopment).toBe(true)
  })
});
