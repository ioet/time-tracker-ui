import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';

import { getProjects } from './../store/project.selectors';
import { ProjectListComponent } from './project-list.component';
import { ProjectState } from '../store/project.reducer';
import { getCustomerProjects } from '../store/project.selectors';
import { SetProjectToEdit, DeleteProject } from '../store/project.actions';
import { FilterProjectPipe } from '../../../../../shared/pipes';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let store: MockStore<ProjectState>;
  let getCustomerProjectsSelectorMock;
  let allCustomerProjectsSelectorMock;

  const state: ProjectState = {
    projects: [],
    customerProjects: [],
    isLoading: false,
    message: '',
    projectToEdit: undefined,
  };

  const project = { id: '123', name: 'aaa', description: 'xxx', project_type_id: '1234' };

  beforeEach(
    () => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ProjectListComponent, FilterProjectPipe],
      providers: [
        provideMockStore({ initialState: state })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    store.setState(state);
    getCustomerProjectsSelectorMock = store.overrideSelector(getCustomerProjects, state);
    allCustomerProjectsSelectorMock = store.overrideSelector(getProjects, state.projects);
    component.projectsSubscription = new Subscription();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('loads projects from state onInit', () => {
    component.ngOnInit();

    expect(component.projects).toBe(state.customerProjects);
  });

  it('should destroy the subscriptions', () => {
    component.projectsSubscription = new Subscription();
    const subscription = spyOn(component.projectsSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
  });

  it('updateProject, should dispatch SetProjectToEdit action', () => {
    spyOn(store, 'dispatch');
    component.projectsSubscription = new Subscription();
    const subscription = spyOn(component.projectsSubscription, 'unsubscribe');

    component.updateProject(project);

    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new SetProjectToEdit(project));
  });

  it('deleteProject, should dispatch DeleteProject action', () => {
    component.projectsSubscription = new Subscription();
    const subscription = spyOn(component.projectsSubscription, 'unsubscribe');

    component.idToDelete = project.id;
    spyOn(store, 'dispatch');
    component.deleteProject();
    component.ngOnDestroy();
    expect(subscription).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new DeleteProject(project.id));
  });
});
