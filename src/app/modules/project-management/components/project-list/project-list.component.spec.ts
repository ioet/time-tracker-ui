import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { FilterProjectPipe } from 'src/app/modules/shared/pipes/filter-project/filter-project.pipe';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponent, FilterProjectPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteProject event #removeProject', () => {
    const project = {
      id: '1',
      name: 'app 4',
      details: 'It is a good app',
      status: 'inactive',
      completed: true
    };

    component.projectToDelete = project;
    spyOn(component.deleteProject, 'emit');
    component.removeProject(project.id);
    expect(component.deleteProject.emit).toHaveBeenCalled();
    expect(component.projectToDelete).toBe(null);
  });

  it('should open delete modal #openModal', () => {
    const project = {
      id: '1',
      name: 'app 4',
      details: 'It is a good app',
      status: 'inactive',
      completed: true
    };

    component.openModal(project);
    expect(component.projectToDelete.id).toBe('1');
    expect(component.projectToDelete.name).toBe('app 4');
    expect(component.projectToDelete.details).toBe('It is a good app');
    expect(component.projectToDelete.status).toBe('inactive');
    expect(component.projectToDelete.completed).toBe(true);
  });
});
