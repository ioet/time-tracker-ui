import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    expect(component.showOptionInDevelopment).toBe(true);
  });

  it('should check if add new entry button is render', () => {
    const addItemDebugElement = fixture.debugElement.query(By.css('div.col-12.px-0')).childNodes.length;
    expect(addItemDebugElement).toBe(3);
  });
});
