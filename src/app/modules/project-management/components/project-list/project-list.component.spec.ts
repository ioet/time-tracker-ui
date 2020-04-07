import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ProjectListComponent } from './project-list.component';
import { AppState } from '../../store/project.reducer';
import { allProjects } from '../../store/project.selectors';
import { FilterProjectPipe } from '../../../shared/pipes';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let store: MockStore<AppState>;
  let mockProjectsSelector;

  const state = {
    projectList: [{ id: 'id', name: 'name', description: 'description' }],
    isLoading: false,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponent, FilterProjectPipe],
      providers: [provideMockStore({ initialState: state })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockProjectsSelector = store.overrideSelector(allProjects, state);
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
      description: 'It is a good app',
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
      description: 'It is a good app',
    };

    component.openModal(project);
    expect(component.projectToDelete.id).toBe('1');
    expect(component.projectToDelete.name).toBe('app 4');
    expect(component.projectToDelete.description).toBe('It is a good app');
  });
});
