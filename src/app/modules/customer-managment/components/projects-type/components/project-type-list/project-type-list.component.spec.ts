import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeListComponent } from './project-type-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ProjectTypeTableListComponent', () => {
  let component: ProjectTypeListComponent;
  let fixture: ComponentFixture<ProjectTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ProjectTypeListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
