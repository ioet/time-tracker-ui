import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchActivityComponent } from './search-activity.component';
import { NgSelectModule } from '@ng-select/ng-select';

describe('SearchActivityComponent', () => {
  let component: SearchActivityComponent;
  let fixture: ComponentFixture<SearchActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgSelectModule ],
      declarations: [ SearchActivityComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changedFilterValue event #changeFilterValue', () => {
    component.selectedActivity = 'angular';
    spyOn(component.selectedActivityId, 'emit');
    component.updateActivity();
    expect(component.selectedActivityId.emit).toHaveBeenCalled();
  });
});
