import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ProjectListHoverComponent } from './project-list-hover.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from 'src/app/modules/project-management/services/project.service';
import { FilterProjectPipe } from 'src/app/modules/shared/pipes/filter-project/filter-project.pipe';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProjectListHoverComponent, FilterProjectPipe],
      providers: [ProjectService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('service should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('should have getProjects function', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service.getProjects).toBeTruthy();
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
    component.showFields.subscribe((showFields: boolean) =>
      expect(showFields).toEqual(true)
    );
    component.clockIn(id);
  });
});
