import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchProjectComponent } from './search-project.component';
import { NgSelectModule } from '@ng-select/ng-select';

describe('SearchActivityComponent', () => {
  let component: SearchProjectComponent;
  let fixture: ComponentFixture<SearchProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgSelectModule ],
      declarations: [ SearchProjectComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changedFilterValue event #changeFilterValue', () => {
    component.selectedProject = 'angular';
    spyOn(component.selectedProjectId, 'emit');
    component.updateProject();
    expect(component.selectedProjectId.emit).toHaveBeenCalled();
  });
});
