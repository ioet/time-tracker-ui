import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { ProjectListComponent } from './project-list.component';
import { ProjectState } from '../store/project.reducer';
import { allProjects } from '../store/project.selectors';
import { SetProjectToEdit, DeleteProject } from '../store/project.actions';
import { FilterProjectPipe } from '../../../../../shared/pipes';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let store: MockStore<ProjectState>;
  let allProjectsSelectorMock;

  const state = {
    projectList: [{ id: 'id', name: 'name', project_type_id: '' }],
    isLoading: false,
    message: '',
    projectToEdit: undefined,
  };

  const project = { id: '123', name: 'aaa', description: 'xxx', project_type_id: '1234' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ProjectListComponent, FilterProjectPipe],
      providers: [provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);
    allProjectsSelectorMock = store.overrideSelector(allProjects, state);
    component.projectsSubscription = new Subscription();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onInit, LoadProjects action is dispatched', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should destroy the subscriptions', () => {
    component.projectsSubscription = new Subscription();
    const subscription = spyOn(component.projectsSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
  });

  it('updateProject, should dispatch SetProjectToEdit action', () => {
    component.projectsSubscription = new Subscription();
    const subscription = spyOn(component.projectsSubscription, 'unsubscribe');
    spyOn(store, 'dispatch');
    component.updateProject(project);
    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new SetProjectToEdit(project));
  });

  it('deleteProject, should dispatch DeleteProject action', () => {
    component.projectsSubscription = new Subscription();
    const subscription = spyOn(component.projectsSubscription, 'unsubscribe');

    spyOn(store, 'dispatch');
    component.deleteProject(project.id);
    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new DeleteProject(project.id));
  });
});
