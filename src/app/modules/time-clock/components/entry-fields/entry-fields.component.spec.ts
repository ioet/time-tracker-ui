import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TechnologyState} from '../../../shared/store/technology.reducers';
import {allTechnologies} from '../../../shared/store/technology.selectors';
import {EntryFieldsComponent} from './entry-fields.component';
import {ProjectState} from '../../../customer-management/components/projects/components/store/project.reducer';
import {getCustomerProjects} from '../../../customer-management/components/projects/components/store/project.selectors';
import * as entryActions from '../../store/entry.actions';

describe('EntryFieldsComponent', () => {
  type Merged = TechnologyState & ProjectState;
  let component: EntryFieldsComponent;
  let fixture: ComponentFixture<EntryFieldsComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;

  const state = {
    projects: {
      projects: [{id: 'id', name: 'name', project_type_id: ''}],
      customerProjects: [{id: 'id', name: 'name', description: 'description', project_type_id: '123'}],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    technologies: {
      technologyList: {items: [{name: 'java'}]},
      isLoading: false,
    },
    activities: {
      data: [{id: 'fc5fab41-a21e-4155-9d05-511b956ebd05', tenant_id: 'ioet', deleted: null, name: 'Training 2'}],
      isLoading: false,
      message: 'Data fetch successfully!',
      activityIdToEdit: '',
    },
    entries: {
      active: {
        id: 'id-15',
        project_id: 'project-id-15',
        description: 'description for active entry',
        technologies: ['java', 'typescript'],
        uri: 'abc',
      },
      entryList: [],
      message: '',
    },
  };

  const entry = {
    id: 'id-15',
    project_id: 'project-id-15',
    description: 'description for active entry',
    uri: 'abc',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntryFieldsComponent],
      providers: [provideMockStore({initialState: state})],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
    mockProjectsSelector = store.overrideSelector(getCustomerProjects, state.projects);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data in entryForm', () => {
    const entryDataForm = {
      description: 'description for active entry',
      technologies: null,
      uri: 'abc',
    };

    spyOn(component.entryForm, 'patchValue');

    component.setDataToUpdate(entry);

    expect(component.entryForm.patchValue).toHaveBeenCalledTimes(1);
    expect(component.entryForm.patchValue).toHaveBeenCalledWith(
      {description: entryDataForm.description, uri: entryDataForm.uri});
    expect(component.selectedTechnologies).toEqual([]);
  });

  it('should dispatch UpdateActiveEntry action #onSubmit', () => {
    spyOn(store, 'dispatch');
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.UpdateActiveEntry(entry));
  });

  it('when a technology is added, then dispatch UpdateActiveEntry', () => {
    const addedTechnologies = ['react'];
    spyOn(store, 'dispatch');

    component.onTechnologyAdded(addedTechnologies);
    expect(store.dispatch).toHaveBeenCalled();

  });

  it('when a technology is removed, then  dispatch UpdateActiveEntry', () => {
    const addedTechnologies = ['react'];

    spyOn(store, 'dispatch');

    component.onTechnologyAdded(addedTechnologies);
    expect(store.dispatch).toHaveBeenCalled();

  });
});
