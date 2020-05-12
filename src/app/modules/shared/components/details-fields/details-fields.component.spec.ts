import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

import { TechnologyState } from '../../store/technology.reducers';
import { allTechnologies } from '../../store/technology.selectors';
import { DetailsFieldsComponent } from './details-fields.component';
import * as actions from '../../store/technology.actions';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getCustomerProjects } from '../../../customer-management/components/projects/components/store/project.selectors';

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
      data: [{ id: 'fc5fab41-a21e-4155-9d05-511b956ebd05', tenant_id: 'ioet', deleted: null, name: 'abc' }],
      isLoading: false,
      message: 'Data fetch successfully!',
      activityIdToEdit: '',
    },
  };

  const initialData = {
    activity: '',
    uri: '',
    start_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    end_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    start_hour: '00:00',
    end_hour: '00:00',
    description: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFieldsComponent],
      providers: [provideMockStore({ initialState: state })],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
    mockProjectsSelector = store.overrideSelector(getCustomerProjects, state.projects);
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
    expect(component.projectName).toEqual('');
    expect(component.project).toEqual('');
  });

  it('should emit ngOnChange with new data', () => {
    const project = { id: 'id', name: 'name', project_type_id: '' };
    const entryToEdit = {
      project_id: 'id',
      activity_id: 'fc5fab41-a21e-4155-9d05-511b956ebd05',
      uri: 'ticketUri',
      start_date: '2020-02-05T14:36',
      end_date: '2020-02-05T15:36',
      start_hour: '14:36',
      end_hour: '15:36',
      description: '',
    };
    const formValue = {
      activity: 'abc',
      uri: 'ticketUri',
      start_date: '2020-02-05',
      end_date: '2020-02-05',
      start_hour: '14:36',
      end_hour: '15:36',
      description: '',
    };
    component.project = project;
    component.entryToEdit = entryToEdit;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(formValue);
    expect(component.projectName).toEqual(project.name);
  });

  it('should emit ngOnChange with new data', () => {
    const project = { id: 'id', name: 'name', project_type_id: '' };
    const entryToEdit = {
      project_id: 'id',
      activity_id: '',
      uri: 'ticketUri',
      start_date: null,
      end_date: null,
      description: '',
    };
    const formValue = {
      activity: '',
      uri: 'ticketUri',
      start_date: '',
      end_date: '',
      start_hour: '00:00',
      end_hour: '00:00',
      description: '',
    };
    component.project = project;
    component.entryToEdit = entryToEdit;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(formValue);
    expect(component.projectName).toEqual(project.name);
  });

  it('should emit ngOnChange with new data', () => {
    const formValue = {
      activity: '',
      uri: '',
      start_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      end_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      start_hour: '00:00',
      end_hour: '00:00',
      description: '',
    };
    component.entryToEdit = null;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(formValue);
    expect(component.projectName).toEqual('');
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
    const data = {
      project_id: undefined,
      activity_id: null,
      technologies: [],
      description: '',
      start_date: 'T00:00',
      end_date: 'T00:00',
      uri: '',
    };
    expect(component.saveEntry.emit).toHaveBeenCalledWith(data);
  });

  it('should emit saveEntry without project and activite fields event', () => {
    spyOn(component.saveEntry, 'emit');
    component.entryForm.setValue({
      activity: 'activity1',
      uri: '',
      start_date: '',
      end_date: '',
      start_hour: '00:00',
      end_hour: '00:00',
      description: '',
    });
    component.projectName = { id: 'abc', name: 'name' };
    component.activities = [
      { id: 'fc5fab41-a21e-4155-9d05-511b956ebd05', tenant_id: 'ioet', name: 'activity1', description: '' },
    ];
    component.onSubmit();
    const data = {
      project_id: 'abc',
      activity_id: 'fc5fab41-a21e-4155-9d05-511b956ebd05',
      technologies: [],
      description: '',
      start_date: 'T00:00',
      end_date: 'T00:00',
      uri: '',
    };
    expect(component.saveEntry.emit).toHaveBeenCalledWith(data);
  });
});
