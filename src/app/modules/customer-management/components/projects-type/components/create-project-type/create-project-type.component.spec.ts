import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProjectTypeComponent } from './create-project-type.component';
import {
  ProjectTypeState,
  CreateProjectType,
  UpdateProjectType,
  projectTypeIdToEdit,
  allProjectTypes,
  ResetProjectTypeToEdit,
  getProjectTypeById,
} from '../../store';
import { getCustomerId } from 'src/app/modules/customer-management/store/customer-management.selectors';
import { ProjectType } from '../../../../../shared/models/project-type.model';

describe('InputProjectTypeComponent', () => {
  let component: CreateProjectTypeComponent;
  let fixture: ComponentFixture<CreateProjectTypeComponent>;
  let store: MockStore<ProjectTypeState>;
  let projectTypeIdToEditMock;
  let getCustomerIdMock;
  let allProjectTypesMock;
  let getProjectTypeByIdMock;
  let getProjectTypeByIdSelectorMock;

  const state = {
    data: [{ id: '', name: '', description: '' }],
    isLoading: false,
    message: '',
    projectTypeIdToEdit: '',
  };

  const projectType: ProjectType = {
    id: '1',
    name: 'Training',
    description: 'It is good for learning',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateProjectTypeComponent],
      providers: [FormBuilder, provideMockStore({ initialState: state })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    store.setState(state);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('onInit, LoadProjectsType action is dispatched', () => {
    getProjectTypeByIdSelectorMock = store.overrideSelector(getProjectTypeById, projectType);
    component.ngOnInit();

    expect(component.projectTypeToEdit).toEqual(projectType);
  });

  it('should reset form onSubmit and dispatch UpdateProjectType action', () => {
    const currentState = {
      data: [{ id: '1', name: 'xxx', description: 'xxxx', customerId: component.customerId }],
      isLoading: false,
      message: '',
      projectTypeIdToEdit: '1',
    };

    getCustomerIdMock = store.overrideSelector(getCustomerId, 'xyz');
    projectTypeIdToEditMock = store.overrideSelector(projectTypeIdToEdit, currentState.projectTypeIdToEdit);
    allProjectTypesMock = store.overrideSelector(allProjectTypes, currentState.data);
    getProjectTypeByIdMock = store.overrideSelector(allProjectTypesMock, projectTypeIdToEditMock);

    component.projectTypeToEdit = getProjectTypeByIdMock;

    const projectTypeForm = {
      name: 'Develop',
      description: 'xxx',
    };

    const projectTypeUpdated = {
      id: component.projectTypeToEdit.id,
      name: 'Develop',
      description: 'xxx',
    };

    spyOn(component.projectTypeForm, 'reset');
    spyOn(store, 'dispatch');

    component.onSubmit(projectTypeForm);

    expect(component.projectTypeForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateProjectType(projectTypeUpdated));
  });

  it('should reset form onSubmit and dispatch CreateProjectType action', () => {
    component.projectTypeToEdit = undefined;

    spyOn(component.projectTypeForm, 'reset');
    spyOn(store, 'dispatch');
    component.customerId = '';
    component.onSubmit(projectType);
    const projectTypeData = {
      ...projectType,
      customer_id: '',
    };

    expect(component.projectTypeForm.reset).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new CreateProjectType(projectTypeData));
  });

  it('should reset projectTypeForm if projectTypeIdToEdit is null', () => {

    spyOn(component.projectTypeForm, 'reset');

    store.overrideSelector(projectTypeIdToEdit, null);
    store.refreshState();
    expect(component.projectTypeForm.reset).toHaveBeenCalled();
  });

  it('should get name using projectTypeForm', () => {
    spyOn(component.projectTypeForm, 'get');
    // tslint:disable-next-line:no-unused-expression
    component.name;
    expect(component.projectTypeForm.get).toHaveBeenCalledWith('name');
  });

  it('should get description using projectTypeForm', () => {
    spyOn(component.projectTypeForm, 'get');

    // tslint:disable-next-line:no-unused-expression
    component.description;

    expect(component.projectTypeForm.get).toHaveBeenCalledWith('description');
  });

  it('should set data in projectTypeForm', () => {
    const projectTypeDataForm = {
      name: 'Training',
      description: 'It is good for learning',
    };

    spyOn(component.projectTypeForm, 'setValue');

    component.setDataToUpdate(projectType);
    expect(component.projectTypeForm.setValue).toHaveBeenCalledTimes(1);
    expect(component.projectTypeForm.setValue).toHaveBeenCalledWith(projectTypeDataForm);
  });

  it('shoud reset Project Type Form before set the data to Edit', () => {
    spyOn(component.projectTypeForm, 'reset');

    component.setDataToUpdate(projectType);

    expect(component.projectTypeForm.reset).toHaveBeenCalled();
  });

  it('should dispatch a ResetProjectTypeToEdit action', () => {
    spyOn(store, 'dispatch');
    spyOn(component.hasChangedEvent, 'emit');

    component.cancelButton();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new ResetProjectTypeToEdit());
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(false);
  });

  it('if detect changes in create project type , it should emit a true', () => {
    component.hasChange = true;
    spyOn(component.hasChangedEvent, 'emit');

    component.onInputChangeProjectType('name project');

    expect(component.hasChange).toBe(true);
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(true);
  });

  it('if not detect changes in create project type, it should emit a false', () => {
    component.hasChange = false;
    spyOn(component.hasChangedEvent, 'emit');

    component.onInputChangeProjectType('');

    expect(component.hasChange).toBe(false);
    expect(component.hasChangedEvent.emit).toHaveBeenCalledWith(false);
  });
});
