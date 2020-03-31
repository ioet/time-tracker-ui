import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ProjectListHoverComponent } from './project-list-hover.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from 'src/app/modules/project-management/services/project.service';

describe('ProjectListHoverComponent', () => {
  let component: ProjectListHoverComponent;
  let fixture: ComponentFixture<ProjectListHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProjectListHoverComponent],
      providers: [ProjectService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('should have add function', () => {
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
