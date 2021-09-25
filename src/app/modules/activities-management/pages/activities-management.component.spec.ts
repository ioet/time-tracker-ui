import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
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
});
