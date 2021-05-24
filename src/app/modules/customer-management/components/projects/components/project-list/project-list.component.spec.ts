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
import { ProjectUI } from 'src/app/modules/shared/models';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let store: MockStore<ProjectState>;
  let getCustomerProjectsSelectorMock;
  let allCustomerProjectsSelectorMock;

  const project = { id: '123', name: 'aaa', description: 'xxx', project_type_id: '1234', technologies: ['python', 'angular'], status: 'inactive' };

  const state: ProjectState = {
    projects: [project],
    customerProjects: [project],
    isLoading: false,
    message: '',
    projectToEdit: undefined,
  };

  const btnProps = [
    {
      key: 'active',
      _status: false,
      btnColor: 'btn-danger',
      btnIcon: 'fa-arrow-circle-down',
      btnName: 'Archive',
    },
    {
      key: 'inactive',
      _status: true,
      btnColor: 'btn-primary',
      btnIcon: 'fa-arrow-circle-up',
      btnName: 'Active',
    },
  ];

  beforeEach(() => {
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
    spyOn(component, 'getProjectTypeName').and.callFake((typeId: string) => 'BK');
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('loads projects from state onInit', () => {
    component.ngOnInit();

    const StateWithBtnProperties = state.customerProjects.map((projectfilter: ProjectUI) => {
      const addProps = btnProps.find((prop) => prop.key === component.setActive(projectfilter.status));
      return { ...projectfilter, ...addProps };
    });
    expect(component.projects).toEqual(StateWithBtnProperties);
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

  it('switchStatus should call openModal() on item.status = activate', () => {
    const itemData = {
      id: '123',
      name: 'aaa',
      description: 'xxx',
      project_type_id: '1234',
      technologies: ['python', 'angular'],
      status: 'activate',
      key: 'activate',
      _status: false,
      btnColor: 'btn-danger',
      btnIcon: 'fa-arrow-circle-down',
      btnName: 'Archive',
    };

    spyOn(component, 'openModal');
    component.switchStatus(itemData);
    expect(component.openModal).toHaveBeenCalled();
  });

  it('switchStatus should set showModal false when item.status = inactive', () => {
    const itemData = {
      id: '123',
      name: 'aaa',
      description: 'xxx',
      project_type_id: '1234',
      technologies: ['python', 'angular'],
      status: 'inactive',
      key: 'inactive',
      _status: true,
      btnColor: 'btn-primary',
      btnIcon: 'fa-arrow-circle-up',
      btnName: 'Active',
    };

    component.switchStatus(itemData);
    expect(component.showModal).toBeFalse();
  });

  it('projects table should display Project Type', (done) => {
    const projectType = {
      id: '1234',
      name: 'BK',
      description: 'test',
    };

    component.projectsTypes = [projectType];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(2);

      const headerRow = tableRows[0];
      expect(headerRow.cells[3].innerHTML).toBe('Project Type');

      const dataRow = tableRows[1];
      expect(dataRow.cells[3].innerHTML).toBe('BK');

      done();
    });
  });
});
