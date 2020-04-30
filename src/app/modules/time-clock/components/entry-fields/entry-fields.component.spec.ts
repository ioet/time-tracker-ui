import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TechnologyState } from '../../../shared/store/technology.reducers';
import { allTechnologies } from '../../../shared/store/technology.selectors';
import { EntryFieldsComponent } from './entry-fields.component';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getCustomerProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import * as actions from '../../../shared/store/technology.actions';
import * as entryActions from '../../store/entry.actions';

describe('EntryFieldsComponent', () => {
  type Merged = TechnologyState & ProjectState;
  let component: EntryFieldsComponent;
  let fixture: ComponentFixture<EntryFieldsComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;
  let length;

  const state = {
    projects: {
      projects: [{ id: 'id', name: 'name', project_type_id: '' }],
      customerProjects: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    technologies: {
      technologyList: { items: [{ name: 'java' }] },
      isLoading: false,
    },
    activities: {
      data: [{ id: 'fc5fab41-a21e-4155-9d05-511b956ebd05', tenant_id: 'ioet', deleted: null, name: 'Training 2' }],
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
      isLoading: false,
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
      providers: [provideMockStore({ initialState: state })],
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
      { description: entryDataForm.description, uri: entryDataForm.uri, });
    expect(component.selectedTechnology).toEqual([]);
  });

  it('should dispatch FindTechnology action #getTechnologies', () => {
    const value = 'java';
    spyOn(store, 'dispatch');
    length = value.length;
    component.getTechnologies(value);

    expect(component.showlist).toBe(true);
    expect(store.dispatch).toHaveBeenCalledWith(new actions.FindTechnology(value));
  });

  it('should NOT dispatch FindTechnology action #getTechnologies', () => {
    const value = 'j';
    spyOn(store, 'dispatch');
    length = value.length;
    component.getTechnologies(value);

    expect(store.dispatch).not.toHaveBeenCalledWith(new actions.FindTechnology(value));
  });

  it('should add a new tag #setTechnology', () => {
    spyOn(store, 'dispatch');
    const name = 'ngrx';
    component.selectedTechnology = ['java', 'javascript'];
    component.selectedTechnology.indexOf(name);
    length = component.selectedTechnology.length;

    const newEntry = {
      id: 'id-15',
      project_id: 'project-id-15',
      uri: 'abc',
    };

    component.setTechnology(name);
    expect(component.selectedTechnology.length).toBe(3);
    expect(store.dispatch).toHaveBeenCalledWith(
      new entryActions.UpdateActiveEntry({ ...newEntry, technologies: component.selectedTechnology })
    );
  });

  it('should NOT add a new tag #setTechnology', () => {
    const name = 'ngrx';
    component.selectedTechnology = [
      'java',
      'javascript',
      'angular',
      'angular-ui',
      'typescript',
      'scss',
      'bootstrap',
      'jasmine',
      'karme',
      'github',
    ];
    component.selectedTechnology.indexOf(name);
    length = component.selectedTechnology.length;
    component.setTechnology(name);
    expect(component.selectedTechnology.length).toBe(10);
  });

  it('should call the removeTag function #setTechnology', () => {
    const name = 'java';
    component.selectedTechnology = ['java', 'javascript'];
    const index = component.selectedTechnology.indexOf(name);
    spyOn(component, 'removeTag');
    component.setTechnology(name);
    expect(component.removeTag).toHaveBeenCalledWith(index);
  });

  it('should dispatch UpdateActiveEntry action #removeTag function', () => {
    spyOn(store, 'dispatch');
    const index = 1;
    const newEntry = {
      id: 'id-15',
      project_id: 'project-id-15',
      uri: 'abc',
    };
    component.selectedTechnology = ['java', 'angular'];
    const technologies = component.selectedTechnology.filter((item) => item !== component.selectedTechnology[index]);
    component.removeTag(index);
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.UpdateActiveEntry({ ...newEntry, technologies }));
  });

  it('should dispatch UpdateActiveEntry action #onSubmit', () => {
    spyOn(store, 'dispatch');
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.UpdateActiveEntry(entry));
  });
});
