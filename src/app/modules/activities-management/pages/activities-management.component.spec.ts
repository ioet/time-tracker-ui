import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { ActivitiesManagementComponent } from './activities-management.component';
import { ActivityListComponent } from '../components/activity-list/activity-list.component';
import { CreateActivityComponent } from '../components/create-activity/create-activity.component';


const state = {};

describe('ActivitiesManagementComponent', () => {
  let component: ActivitiesManagementComponent;
  let fixture: ComponentFixture<ActivitiesManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}), ReactiveFormsModule ],
      providers: [ provideMockStore({ initialState: state }) ],
      declarations: [
        ActivitiesManagementComponent,
        CreateActivityComponent,
        ActivityListComponent,
      ]
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

  it('should check if add new entry button is rendered', () => {
    const addItemDebugElement = fixture.debugElement.query(By.css('div.col-12.px-0')).childNodes.length;
    expect(addItemDebugElement).toBe(3);
  });
});
