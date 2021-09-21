import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreateProjectComponent } from './create-project.component';
import { ProjectState } from '../store/project.reducer';
import { Project } from 'src/app/modules/shared/models';
import { getProjectToEdit } from '../store/project.selectors';
import { UpdateProject, CreateProject, ResetProjectToEdit } from '../store/project.actions';

describe('InputProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;
  let store: MockStore<ProjectState>;
  let getProjectToEditMock;

  const state = {
    projects: [{ id: '', name: '', project_type_id: '' }],
    customerProjects: [{ id: '', name: '', project_type_id: '' }],
    recentProjects: [],
    isLoading: false,
    message: '',
    projectToEdit: undefined,
  };

  const project: Project = {
    id: '1',
    name: 'Test',
    description: 'xxx',
    project_type_id: '123',
  };

  const projectForm = {
    name: 'Test',
    description: 'xxx',
    project_type_id: '123',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectComponent],
      providers: [FormBuilder, provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    store.setState(state);

    component.projectToEditSubscription = new Subscription();
    component.projectTypesSubscription = new Subscription();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('gets description from form', () => {
    spyOn(component.projectForm, 'get');

    // tslint:disable-next-line:no-unused-expression
    component.description;

    expect(component.projectForm.get).toHaveBeenCalledWith('description');
  });

  it('gets project_type_id from form', () => {
    spyOn(component.projectForm, 'get');

    // tslint:disable-next-line:no-unused-expression
    component.project_type_id;

    expect(component.projectForm.get).toHaveBeenCalledWith('project_type_id');
  });

  it('should destroy the subscriptions', () => {
    component.projectToEditSubscription = new Subscription();
    component.projectTypesSubscription = new Subscription();
    const subscription = spyOn(component.projectToEditSubscription, 'unsubscribe');
    const projectTypeSubscription = spyOn(component.projectTypesSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(projectTypeSubscription).toHaveBeenCalledTimes(1);
  });

  it('should reset form #onSubmit and dispatch UpdateProject action', () => {
    const currentState = {
      projects: [],
      customerProjects: [],
      data: [project],
      isLoading: false,
      message: '',
      projectToEdit: project,
    };

    getProjectToEditMock = store.overrideSelector(getProjectToEdit, currentState.projectToEdit);
    component.projectToEdit = getProjectToEditMock;

    const projectUpdated = {
      id: component.projectToEdit.id,
      name: 'Test',
      description: 'xxx',
      project_type_id: '123',
    };

    component.projectToEditSubscription = new Subscription();
    component.projectTypesSubscription = new Subscription();
    spyOn(component.projectForm, 'reset');
    spyOn(store, 'dispatch');
    const subscription = spyOn(component.projectToEditSubscription, 'unsubscribe');
    const projectTypeSubscription = spyOn(component.projectTypesSubscription, 'unsubscribe');

    component.onSubmit(projectForm);
    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(projectTypeSubscription).toHaveBeenCalledTimes(1);

    expect(component.projectForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateProject(projectUpdated));
  });

  it('should reset form #onSubmit and dispatch UpdateProject action with null project_type_id', () => {
    const currentState = {
      data: [project],
      isLoading: false,
      message: '',
      projectToEdit: project,
    };

    const dataForm = {
      name: 'Test',
      description: 'xxx',
      project_type_id: '',
    };

    getProjectToEditMock = store.overrideSelector(getProjectToEdit, currentState.projectToEdit);
    component.projectToEdit = getProjectToEditMock;

    const projectUpdated = {
      id: component.projectToEdit.id,
      name: 'Test',
      description: 'xxx',
      project_type_id: null,
    };

    component.projectToEditSubscription = new Subscription();
    component.projectTypesSubscription = new Subscription();
    spyOn(component.projectForm, 'reset');
    spyOn(store, 'dispatch');
    const subscription = spyOn(component.projectToEditSubscription, 'unsubscribe');
    const projectTypeSubscription = spyOn(component.projectTypesSubscription, 'unsubscribe');

    component.onSubmit(dataForm);
    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(projectTypeSubscription).toHaveBeenCalledTimes(1);
    expect(dataForm.project_type_id).toBe(null);
    expect(component.projectForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateProject(projectUpdated));
  });

  it('should reset form onSubmit and dispatch CreateProject action', () => {
    component.projectToEdit = undefined;

    spyOn(component.projectForm, 'reset');
    spyOn(store, 'dispatch');
    component.customerId = '';
    component.onSubmit(projectForm);
    const projectData = {
      ...projectForm,
      customer_id: '',
    };

    expect(component.projectForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateProject(projectData));
  });

  it('should reset form onSubmit and dispatch CreateProject action with null project_type_id', () => {
    const dataForm = {
      name: 'Test',
      description: 'xxx',
      project_type_id: null,
    };
    component.projectToEdit = undefined;

    spyOn(component.projectForm, 'reset');
    spyOn(store, 'dispatch');
    component.customerId = '';
    const projectData = {
      ...dataForm,
      customer_id: '',
    };

    component.onSubmit(dataForm);
    expect(dataForm.project_type_id).toBe(null);
    expect(component.projectForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateProject(projectData));
  });

  it('should set data in projectForm', () => {
    component.projectToEditSubscription = new Subscription();
    component.projectTypesSubscription = new Subscription();
    component.projectToEdit = project;

    const subscription = spyOn(component.projectToEditSubscription, 'unsubscribe');
    const projectTypeSubscription = spyOn(component.projectTypesSubscription, 'unsubscribe');
    spyOn(component.projectForm, 'setValue');

    component.setDataToUpdate(project);
    component.ngOnDestroy();

    expect(subscription).toHaveBeenCalledTimes(1);
    expect(projectTypeSubscription).toHaveBeenCalledTimes(1);
    expect(component.projectForm.setValue).toHaveBeenCalledTimes(1);
    expect(component.projectForm.setValue).toHaveBeenCalledWith(projectForm);
  });

  it('shoud reset Project Form before set the data to Edit', () => {
    spyOn(component.projectForm, 'reset');

    component.setDataToUpdate(project);

    expect(component.projectForm.reset).toHaveBeenCalled();
  });

  it('should dispatch a ResetActivityToEdit action', () => {
    spyOn(store, 'dispatch');
    spyOn(component.hasChangedEvent, 'emit');

    component.cancelButton();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetProjectToEdit());
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(false);
  });

  it('if detect changes in create project , it should emit a true', () => {
    component.hasChange = true;
    spyOn(component.hasChangedEvent, 'emit');

    component.onInputChangeProject('name project');

    expect(component.hasChange).toBe(true);
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(true);
  });

  it('if not detect changes in create project, it should emit a false', () => {
    component.hasChange = false;
    spyOn(component.hasChangedEvent, 'emit');

    component.onInputChangeProject('');

    expect(component.hasChange).toBe(false);
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(false);
  });
});
