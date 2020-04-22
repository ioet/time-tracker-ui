import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TechnologyState } from '../../store/technology.reducers';
import { allTechnologies } from '../../store/technology.selectors';
import { DetailsFieldsComponent } from './details-fields.component';
import * as actions from '../../store/technology.actions';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { allProjects } from '../../../customer-management/components/projects/components/store/project.selectors';

describe('DetailsFieldsComponent', () => {
  type Merged = TechnologyState & ProjectState;
  let component: DetailsFieldsComponent;
  let fixture: ComponentFixture<DetailsFieldsComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;
  let length;

  const state = {
    projects: {
      projectList: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
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
  };

  const initialData = {
    project: '',
    activity: '',
    ticket: '',
    comments: '',
  };

  const newData = {
    project: 'Ernst&Young',
    activity: 'development',
    ticket: 'WA-15',
    comments: 'No notes',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFieldsComponent],
      providers: [provideMockStore({ initialState: state })],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
    mockProjectsSelector = store.overrideSelector(allProjects, state.projects);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit ngOnChange without data', () => {
    component.entryToEdit = null;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(initialData);
  });

  it('should emit ngOnChange with new data', () => {
    component.entryToEdit = newData;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(newData);
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
    const name = 'ngrx';
    component.selectedTechnology = ['java', 'javascript'];
    component.selectedTechnology.indexOf(name);
    length = component.selectedTechnology.length;
    component.setTechnology(name);
    expect(component.selectedTechnology.length).toBe(3);
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

  it('should call the removeTag() function #removeTag', () => {
    const index = 1;
    component.selectedTechnology = ['java', 'angular'];
    component.removeTag(index);
    expect(component.selectedTechnology.length).toBe(1);
  });

  it('should emit saveEntry event', () => {
    spyOn(component.saveEntry, 'emit');
    component.onSubmit();
    expect(component.saveEntry.emit).toHaveBeenCalledWith(initialData);
  });
});
