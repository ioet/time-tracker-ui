import { LoadActiveEntry, EntryActionTypes } from './../../store/entry.actions';
import { ActivityManagementActionTypes } from './../../../activities-management/store/activity-management.actions';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import {TechnologyState} from '../../../shared/store/technology.reducers';
import {allTechnologies} from '../../../shared/store/technology.selectors';
import {EntryFieldsComponent} from './entry-fields.component';
import {ProjectState} from '../../../customer-management/components/projects/components/store/project.reducer';
import {getCustomerProjects} from '../../../customer-management/components/projects/components/store/project.selectors';
import { ActionsSubject } from '@ngrx/store';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

describe('EntryFieldsComponent', () => {
  type Merged = TechnologyState & ProjectState;
  let component: EntryFieldsComponent;
  let fixture: ComponentFixture<EntryFieldsComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;
  let entryForm;
  const actionSub: ActionsSubject = new ActionsSubject();
  const toastrServiceStub = {
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
    warning: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };

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
      data: [{id: 'xyz', tenant_id: 'ioet', deleted: null, name: 'Training 2'}],
      isLoading: false,
      message: 'Data fetch successfully!',
      activityIdToEdit: '',
    },
    entries: {
      active: {
        activity_id: 'xyz',
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
    activity_id: 'xyz',
    id: 'id-15',
    project_id: 'project-id-15',
    description: 'description for active entry',
    uri: 'abc',
    start_date : moment().format('YYYY-MM-DD'),
    start_hour : moment().format('HH:mm:ss'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntryFieldsComponent],
      providers: [
        provideMockStore({initialState: state}),
        { provide: ActionsSubject, useValue: actionSub },
        { provide: ToastrService, useValue: toastrServiceStub }
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    entryForm = TestBed.inject(FormBuilder);
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
      activity_id: 'xyz',
      description: 'description for active entry',
      technologies: null,
      uri: 'abc',
    };

    spyOn(component.entryForm, 'patchValue');

    component.setDataToUpdate(entry);

    expect(component.entryForm.patchValue).toHaveBeenCalledTimes(1);
    expect(component.entryForm.patchValue).toHaveBeenCalledWith(
      {
        description: entryDataForm.description,
        uri: entryDataForm.uri,
        activity_id: entryDataForm.activity_id,
        start_hour:  formatDate(entry.start_date, 'HH:mm:ss', 'en'),
        start_date : moment().format('YYYY-MM-DD'),
      }
    );
    expect(component.selectedTechnologies).toEqual([]);
  });

  it('displays error message when the date selected is in the future', () => {
    component.newData = entry;
    component.activeEntry = entry ;
    component.setDataToUpdate(entry);
    spyOn(toastrServiceStub, 'error');

    const hourInTheFuture = moment().add(1, 'hours').format('HH:mm:ss');
    component.entryForm.patchValue({ start_hour : hourInTheFuture});
    component.onUpdateStartHour();

    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  it('If start hour is in the future, reset to initial start_date in form', () => {
    component.newData = entry;
    component.activeEntry = entry ;
    component.setDataToUpdate(entry);

    const hourInTheFuture = moment().add(1, 'hours').format('HH:mm:ss');
    component.entryForm.patchValue({ start_hour : hourInTheFuture});

    spyOn(component.entryForm, 'patchValue');
    component.onUpdateStartHour();

    expect(component.entryForm.patchValue).toHaveBeenCalledWith(
      {
        start_hour: component.newData.start_hour
      }
    );
  });

  it('when a start hour is updated, then dispatch UpdateActiveEntry', () => {
    component.activeEntry = entry ;
    component.setDataToUpdate(entry);
    spyOn(store, 'dispatch');

    component.onUpdateStartHour();
    expect(store.dispatch).toHaveBeenCalled();
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

  it('uses the form to check if is valid or not', () => {
    entryForm.valid = false;

    const result = component.entryFormIsValidate();

    expect(result).toBe(entryForm.valid);
  });

  it('dispatches an action when onSubmit is called', () => {
    spyOn(store, 'dispatch');

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches an action when onTechnologyRemoved is called', () => {
    spyOn(store, 'dispatch');

    component.onTechnologyRemoved(['foo']);

    expect(store.dispatch).toHaveBeenCalled();
  });


  it('sets the technologies on the class when entry has technologies', () => {
    const entryData = { ...entry, technologies: ['foo']};

    component.setDataToUpdate(entryData);

    expect(component.selectedTechnologies).toEqual(entryData.technologies);
  });


  it('activites are populated using the payload of the action', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS,
      payload: [],
    };

    actionSubject.next(action);

    expect(component.activities).toEqual(action.payload);
  });

  it('LoadActiveEntry is dispatchen after LOAD_ACTIVITIES_SUCCESS', () => {
    spyOn(store, 'dispatch');

    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS,
      payload: [],
    };

    actionSubject.next(action);

    expect(store.dispatch).toHaveBeenCalledWith(new LoadActiveEntry());
  });

  it('when entry has an end_date null then LoadActiveEntry is dispatched', () => {
    spyOn(store, 'dispatch');

    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: EntryActionTypes.CREATE_ENTRY_SUCCESS,
      payload: {end_date: null},
    };

    actionSubject.next(action);

    expect(store.dispatch).toHaveBeenCalledWith(new LoadActiveEntry());
  });

  it('when entry has an end_date then nothing is dispatched', () => {
    spyOn(store, 'dispatch');

    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: EntryActionTypes.CREATE_ENTRY_SUCCESS,
      payload: {end_date: new Date()},
    };

    actionSubject.next(action);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('activeEntry is populated using the payload of LOAD_ACTIVE_ENTRY_SUCCESS', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: EntryActionTypes.LOAD_ACTIVE_ENTRY_SUCCESS,
      payload: entry,
    };

    actionSubject.next(action);

    expect(component.activeEntry).toBe(action.payload);
  });

  it('if entryData is null selectedTechnologies is not modified', () => {
    const initialTechnologies = ['foo', 'bar'];
    component.selectedTechnologies = initialTechnologies;

    component.setDataToUpdate(null);

    expect(component.selectedTechnologies).toBe(initialTechnologies);
  });

});
