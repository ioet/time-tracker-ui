import { Subscription } from 'rxjs';
import { LoadActiveEntry, EntryActionTypes } from './../../store/entry.actions';
import { ActivityManagementActionTypes } from './../../../activities-management/store/activity-management.actions';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TechnologyState } from '../../../shared/store/technology.reducers';
import { allTechnologies } from '../../../shared/store/technology.selectors';
import { EntryFieldsComponent } from './entry-fields.component';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getCustomerProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import { ActionsSubject } from '@ngrx/store';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import * as moment from 'moment';
import { DATE_FORMAT_YEAR } from 'src/environments/environment';

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
  const mockDate = '2020-12-01T12:00:00';
  const lastDate = moment(mockDate).format(DATE_FORMAT_YEAR);
  const startHourTest = moment(mockDate).subtract(5, 'hours').format('HH:mm:ss');
  const endHourTest = moment(mockDate).subtract(3, 'hours').format('HH:mm:ss');
  const lastStartHourEntryEntered = new Date(`${lastDate}T${startHourTest.trim()}`).toISOString();
  const lastEndHourEntryEntered = new Date(`${lastDate}T${endHourTest.trim()}`).toISOString();

  const state = {
    projects: {
      projects: [{ id: 'id', name: 'name', project_type_id: '' }],
      customerProjects: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
      recentProjects: [],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    technologies: {
      technologyList: { items: [{ name: 'java' }] },
      isLoading: false,
    },
    activities: {
      data: [{ id: 'xyz', tenant_id: 'ioet', deleted: null, name: 'Training 2', status: 'active' }],
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
      timeEntriesDataSource: {
        data: [
          {
            activity_id: 'xyz',
            activity_name: 'abc',
            id: 'id-15',
            project_id: 'project-id-15',
            description: 'description for an entry',
            uri: 'abc',
            start_date: moment().toISOString(),
            end_date: moment().toISOString(),
          },
          {
            activity_id: 'xyz',
            activity_name: 'abc',
            id: 'id-15',
            project_id: 'project-id-15',
            description: 'description for an entry',
            uri: 'abc',
            start_date: lastStartHourEntryEntered,
            end_date: lastEndHourEntryEntered,
          }
        ]
      }
    },
  };

  const entry = {
    activity_id: 'xyz',
    id: 'id-15',
    project_id: 'project-id-15',
    description: 'description for active entry',
    uri: 'abc',
    start_date: moment(mockDate).format(DATE_FORMAT_YEAR),
    start_hour: moment(mockDate).format('HH:mm')
  };

  const mockEntryOverlap = {
    update_last_entry_if_overlap: true
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EntryFieldsComponent],
      providers: [
        provideMockStore({ initialState: state }),
        { provide: ActionsSubject, useValue: actionSub },
        { provide: ToastrService, useValue: toastrServiceStub }
      ],
      imports: [FormsModule, ReactiveFormsModule, NgxMaterialTimepickerModule],
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
        start_hour: formatDate(entry.start_date, 'HH:mm', 'en'),
        start_date: moment(mockDate).format(DATE_FORMAT_YEAR),
      }
    );
    expect(component.selectedTechnologies).toEqual([]);
  });

  it('displays error message when the date selected is in the future', () => {
    const mockEntry = {
      ...entry,
      start_date: moment().format(DATE_FORMAT_YEAR),
      start_hour: moment().format('HH:mm')
    };

    component.newData = mockEntry;
    component.activeEntry = mockEntry;
    component.setDataToUpdate(mockEntry);
    spyOn(toastrServiceStub, 'error');

    const hourInTheFuture = moment().add(1, 'hours').format('HH:mm');
    component.entryForm.patchValue({ start_hour: hourInTheFuture });
    component.onUpdateStartHour();

    expect(toastrServiceStub.error).toHaveBeenCalled();
    expect(component.showTimeInbuttons).toEqual(false);
  });

  it('Displays an error message when the active entry has start_time before the start_time of another entry', () => {
    component.newData = entry;
    component.activeEntry = entry;
    component.setDataToUpdate(entry);
    spyOn(toastrServiceStub, 'error');

    const hourInThePast = moment(mockDate).subtract(6, 'hour').format('HH:mm');
    component.entryForm.patchValue({ start_hour: hourInThePast });
    component.onUpdateStartHour();

    expect(toastrServiceStub.error).toHaveBeenCalled();
    expect(component.showTimeInbuttons).toEqual(false);
  });

  it('should show time In control buttons when time is modified', () => {
    component.activeTimeInButtons();

    expect(component.showTimeInbuttons).toEqual(true);
  });

  it('should reset displayed time and hide control buttons when cancelTimeInUpdate', () => {
    component.newData = entry;
    component.activeEntry = entry;
    component.setDataToUpdate(entry);
    const updatedTime = moment(mockDate).format('HH:mm');
    component.entryForm.patchValue({ start_hour: updatedTime });
    spyOn(component.entryForm, 'patchValue');
    component.cancelTimeInUpdate();

    expect(component.showTimeInbuttons).toEqual(false);
    expect(component.entryForm.patchValue).toHaveBeenCalledWith(
      {
        start_hour: component.newData.start_hour
      }
    );
  });

  it('should reset to current start_date when start_date has an error', () => {
    component.newData = entry;
    component.activeEntry = entry;
    component.setDataToUpdate(entry);

    const updatedTime = moment(mockDate).subtract(6, 'hours').format('HH:mm');
    component.entryForm.patchValue({ start_hour: updatedTime });

    spyOn(component.entryForm, 'patchValue');
    component.onUpdateStartHour();

    expect(component.entryForm.patchValue).toHaveBeenCalledWith(
      {
        start_hour: component.newData.start_hour
      }
    );
    expect(component.showTimeInbuttons).toEqual(false);
  });

  it('If start hour is in the future, reset to initial start_date in form', () => {
    const mockEntry = {
      ...entry,
      start_date: moment().format(DATE_FORMAT_YEAR),
      start_hour: moment().format('HH:mm')
    };
    component.newData = mockEntry;
    component.activeEntry = mockEntry;
    component.setDataToUpdate(mockEntry);

    const hourInTheFuture = moment().add(1, 'hours').format('HH:mm');
    component.entryForm.patchValue({ start_hour: hourInTheFuture });

    spyOn(component.entryForm, 'patchValue');
    component.onUpdateStartHour();

    expect(component.entryForm.patchValue).toHaveBeenCalledWith(
      {
        start_hour: component.newData.start_hour
      }
    );
    expect(component.showTimeInbuttons).toEqual(false);
  });

  it('when a start hour is updated, then dispatch UpdateActiveEntry', () => {
    component.newData = mockEntryOverlap;
    component.activeEntry = entry;
    component.setDataToUpdate(entry);
    const updatedTime = moment(mockDate).format('HH:mm');

    component.entryForm.patchValue({ start_hour: updatedTime });
    spyOn(store, 'dispatch');

    component.onUpdateStartHour();

    expect(store.dispatch).toHaveBeenCalled();
    expect(component.showTimeInbuttons).toEqual(false);
  });

  it('When start_time is updated, component.last_entry is equal to time entry in the position 1', waitForAsync(() => {
    component.newData = mockEntryOverlap;
    component.activeEntry = entry;
    component.setDataToUpdate(entry);
    const updatedTime = moment(mockDate).format('HH:mm');

    component.entryForm.patchValue({ start_hour: updatedTime });
    component.onUpdateStartHour();

    expect(component.lastEntry).toBe(state.entries.timeEntriesDataSource.data[1]);
  }));

  it('When start_time is updated for a time entry. UpdateCurrentOrLastEntry action is dispatched', () => {
    component.newData = mockEntryOverlap;
    component.activeEntry = entry;
    component.setDataToUpdate(entry);
    const updatedTime = moment(mockDate).subtract(4, 'hours').format('HH:mm');
    component.entryForm.patchValue({ start_hour: updatedTime });
    spyOn(store, 'dispatch');

    component.onUpdateStartHour();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('when a technology is added or removed, then dispatch UpdateActiveEntry', () => {
    const addedTechnologies = ['react'];
    spyOn(store, 'dispatch');

    component.onTechnologyUpdated(addedTechnologies);
    expect(store.dispatch).toHaveBeenCalled();

  });

  it('uses the form to check if is valid or not', () => {
    entryForm.valid = false;

    const result = component.entryFormIsValidate();

    expect(result).toBe(entryForm.valid);
  });

  it('dispatches an action when onSubmit is called', () => {
    const isEntryFormValid = spyOn(component, 'entryFormIsValidate').and.returnValue(true);
    spyOn(store, 'dispatch');

    component.onSubmit();

    expect(isEntryFormValid).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches an action when onTechnologyRemoved is called', () => {
    spyOn(store, 'dispatch');

    component.onTechnologyUpdated(['foo']);

    expect(store.dispatch).toHaveBeenCalled();
  });


  it('sets the technologies on the class when entry has technologies', () => {
    const entryData = { ...entry, technologies: ['foo'] };

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
      payload: { end_date: null },
    };

    actionSubject.next(action);

    expect(store.dispatch).toHaveBeenCalledWith(new LoadActiveEntry());
  });

  it('When update current or last entry then the actions updateEntryRunning, LoadEntries and LoadEntriSummary will be dispatched', () => {
    spyOn(store, 'dispatch');

    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: EntryActionTypes.CREATE_ENTRY_SUCCESS,
      payload: { end_date: new Date() },
    };

    actionSubject.next(action);

    expect(store.dispatch).toHaveBeenCalledTimes(3);
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

  it('calls unsubscribe on ngDestroy', () => {
    component.loadActivitiesSubscription = new Subscription();
    component.loadActiveEntrySubscription = new Subscription();
    component.actionSetDateSubscription = new Subscription();
    spyOn(component.loadActivitiesSubscription, 'unsubscribe');
    spyOn(component.loadActiveEntrySubscription, 'unsubscribe');
    spyOn(component.actionSetDateSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.loadActivitiesSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.loadActiveEntrySubscription.unsubscribe).toHaveBeenCalled();
    expect(component.actionSetDateSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('when a activity is not register in DB should show activatefocus in select activity', () => {
    const activitiesMock  = [{
      id: 'xyz',
      name: 'test',
      description : 'test1'
    }];
    const data = {
      activity_id: 'xyz',
      description: '',
      start_date: moment().format(DATE_FORMAT_YEAR),
      start_hour: moment().format('HH:mm'),
      uri: ''
    };
    component.activities = activitiesMock;
    component.entryForm.patchValue({
      description: data.description,
      uri: data.uri,
      activity_id: data.activity_id,
      start_date: data.start_date,
      start_hour: data.start_hour,
    });
    component.ngOnInit();
    component.activateFocus();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const autofocus = fixture.nativeElement.querySelector('select');
      expect(autofocus).toHaveBeenCalled();
    });
  });
});


