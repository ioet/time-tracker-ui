import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeTableListComponent } from './project-type-table-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ProjectTypeTableListComponent', () => {
  let component: ProjectTypeTableListComponent;
  let fixture: ComponentFixture<ProjectTypeTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ProjectTypeTableListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
