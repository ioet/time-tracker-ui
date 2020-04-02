import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProjectListHoverComponent } from './project-list-hover.component';
import { ProjectService } from '../../../project-management/services/project.service';
import { FilterProjectPipe } from '../../../shared/pipes';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;
  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListHoverComponent, FilterProjectPipe],
      imports: [HttpClientTestingModule],
      providers: [ProjectService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    projectService = TestBed.inject(ProjectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedId with Id', () => {
    const id = 'P1';
    component.clockIn(id);
    expect(component.selectedId).toBe(id);
  });

  it('should emit showFields event', () => {
    const id = 'P1';
    component.showFields.subscribe((showFields: boolean) => expect(showFields).toEqual(true));
    component.clockIn(id);
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance', inject(
    [ProjectService],
    (injectService: ProjectService) => {
      expect(injectService).toBe(projectService);
    }
  ));
});
