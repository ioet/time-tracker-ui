import { formatDate } from '@angular/common';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import * as moment from 'moment';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { getCreateError, getUpdateError } from 'src/app/modules/time-clock/store/entry.selectors';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getCustomerProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import * as entryActions from '../../../time-clock/store/entry.actions';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { TechnologyState } from '../../store/technology.reducers';
import { allTechnologies } from '../../store/technology.selectors';
import { EntryActionTypes } from './../../../time-clock/store/entry.actions';
import { TechnologiesComponent } from './../technologies/technologies.component';
import { DetailsFieldsComponent } from './details-fields.component';
import { ProjectSelectedEvent } from './project-selected-event';
import { SaveEntryEvent } from './save-entry-event';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { DATE_FORMAT } from 'src/environments/environment';
import { DATE_FORMAT_YEAR } from 'src/environments/environment';
import { Project } from '../../models';

describe('DetailsFieldsComponent', () => {
  type Merged = TechnologyState & ProjectState & EntryState;
  let component: DetailsFieldsComponent;
  let fixture: ComponentFixture<DetailsFieldsComponent>;
  let store: MockStore<Merged>;
  let mockTechnologySelector;
  let mockProjectsSelector;
  let mockEntriesUpdateErrorSelector;
  let mockEntriesCreateErrorSelector;
  let entryToEdit;
  let formValues;
  const actionSub: ActionsSubject = new ActionsSubject();
  const toastrServiceStub = {
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => {},
    warning: (message?: string, title?: string, override?: Partial<IndividualConfig>) => {},
  };

  const state = {
    projects: {
      projects: [{ id: 'id', name: 'name', project_type_id: '', customer: { name: 'Juan', description: 'sadsa' } }],
      customerProjects: [{ id: 'id', name: 'name', description: 'description', project_type_id: '123' }],
      recentProjects: [{ id: 'id', name: 'name', customer: { name: 'Juan'} }],
      isLoading: false,
      message: '',
      projectToEdit: undefined,
    },
    technologies: {
      technologyList: { items: [{ name: 'java' }] },
      isLoading: false,
    },
    activities: {
      data: [
        { id: 'fc5fab41-a21e-4155-9d05-511b956ebd05', tenant_id: 'ioet', deleted: null, name: 'abc', status: 'active' },
        {
          id: 'fc5fab41-a21e-4155-9d05-511b956ebd07',
          tenant_id: 'ioet_1',
          deleted: null,
          name: 'def',
          status: 'active',
        },
        {
          id: 'fc5fab41-a21e-4155-9d05-511b956ebd08',
          tenant_id: 'ioet_2',
          deleted: null,
          name: 'ghi',
          status: 'inactive',
        },
        {
          id: 'fc5fab41-a21e-4155-9d05-511b956ebd09',
          tenant_id: 'ioet_3',
          deleted: null,
          name: 'jkl',
          status: 'active',
        },
      ],
      isLoading: false,
      message: 'Data fetch successfully!',
      activityIdToEdit: '',
    },
    Entries: {
      createError: null,
      updateError: null,
    },
  };

  const initialData = {
    project_id: '',
    project_name: '',
    activity_id: '',
    uri: '',
    start_date: formatDate(new Date(), DATE_FORMAT, 'en'),
    end_date: formatDate(new Date(), DATE_FORMAT, 'en'),
    start_hour: '00:00',
    end_hour: '00:00',
    description: '',
    technology: '',
  };

  const mockCurrentDate = '2020-12-01T12:00:00';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DetailsFieldsComponent, TechnologiesComponent],
        providers: [
          provideMockStore({ initialState: state }),
          { provide: ActionsSubject, useValue: actionSub },
          { provide: ToastrService, useValue: toastrServiceStub },
        ],
        imports: [FormsModule, ReactiveFormsModule, AutocompleteLibModule, NgxMaterialTimepickerModule],
      }).compileComponents();
      store = TestBed.inject(MockStore);
      mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
      mockProjectsSelector = store.overrideSelector(getCustomerProjects, state.projects);
      mockEntriesUpdateErrorSelector = store.overrideSelector(getUpdateError, state.Entries.updateError);
      mockEntriesCreateErrorSelector = store.overrideSelector(getCreateError, state.Entries.createError);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFieldsComponent);
    component = fixture.componentInstance;
    entryToEdit = {
      project_id: 'id',
      activity_id: '',
      uri: 'ticketUri',
      start_date: null,
      end_date: null,
      description: '',
      technologies: [],
      id: 'xyz',
    };
    formValues = {
      project_id: 'id',
      project_name: 'name',
      activity_id: 'a1',
      uri: 'ticketUri',
      start_date: '',
      end_date: '',
      start_hour: '00:00',
      end_hour: '00:00',
      description: '',
      technology: '',
    };
    component.canMarkEntryAsWIP = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClearedComponent project id and name are set to empty', () => {
    const search = {term: ''};
    component.onClearedComponent(search);

    expect(component.project_id.value).toBe('');
    expect(component.project_name.value).toBe('');
  });

  it('should change the listProjectsShowed to listProjects if search is not empty on onClearedComponent', () => {
    const search = {term: 'Ioet Inc.'};
    const listProjects: Project[] = [{ id: '1', name: 'abc', status: 'active' }];
    component.listProjects = listProjects;
    component.onClearedComponent(search);

    expect(component.listProjectsShowed).toBe(component.listProjects);
  });

  it('onSelectedProject project id and name are set using event data', () => {
    spyOn(component.entryForm, 'patchValue');

    component.onSelectedProject({ id: 'id', search_field: 'foo' });

    expect(component.entryForm.patchValue).toHaveBeenCalledWith({ project_id: 'id', project_name: 'foo' });
  });

  it('if form is invalid then saveEntry is not emited', () => {
    spyOn(component.saveEntry, 'emit');

    component.onSubmit();

    expect(component.saveEntry.emit).toHaveBeenCalledTimes(0);
  });

  [
    { actionType: EntryActionTypes.CREATE_ENTRY_SUCCESS },
    { actionType: EntryActionTypes.UPDATE_ENTRY_SUCCESS },
  ].forEach((param) => {
    it(`cleanForm after an action type ${param.actionType} is received`, () => {
      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const action = {
        type: param.actionType,
      };
      spyOn(component, 'cleanForm');

      component.ngOnInit();
      actionSubject.next(action);

      expect(component.cleanForm).toHaveBeenCalled();
    });
  });

  it('on cleanFieldsForm the project_id and project_name should be kept', () => {
    const entryFormValueExpected = {
      ...formValues,
      activity_id: '',
      uri: '',
      start_date: formatDate(new Date(), DATE_FORMAT, 'en'),
      end_date: formatDate(new Date(), DATE_FORMAT, 'en'),
      start_hour: '00:00',
      end_hour: '00:00',
      description: '',
      technology: '',
    };

    component.entryForm.setValue(formValues);
    component.cleanFieldsForm();

    expect(component.entryForm.value).toEqual(entryFormValueExpected);
  });

  it('should emit ngOnChange without data', () => {
    component.entryToEdit = null;
    component.ngOnChanges();
    expect(component.shouldRestartEntry).toBeFalse();
    expect(component.entryForm.value).toEqual(initialData);
    component.activities$.subscribe((item) => {
      expect(item.length).not.toBe(null);
      expect(item.length).toBe(3);
    });
  });

  it('should emit ngOnChange with new data', () => {
    const childComponent = jasmine.createSpyObj('ChildComponent', ['closeModal']);
    component.closeModal = childComponent;
    const formValue = {
      project_id: '',
      project_name: '',
      activity_id: '',
      uri: '',
      start_date: formatDate(new Date(), DATE_FORMAT, 'en'),
      end_date: formatDate(new Date(), DATE_FORMAT, 'en'),
      start_hour: '00:00',
      end_hour: '00:00',
      description: '',
      technology: '',
    };
    component.entryToEdit = null;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(formValue);
  });

  const activitiesParams = [
    { select_activity_id: 'fc5fab41-a21e-4155-9d05-511b956ebd07', expected_size_activities: 3, title: 'active' },
    { select_activity_id: 'fc5fab41-a21e-4155-9d05-511b956ebd08', expected_size_activities: 4, title: 'inactive' },
  ];
  activitiesParams.forEach((param) => {
    it(`should emit ngOnChange to set ${param.expected_size_activities} activities for select (${param.title} time entry clicked)`, () => {
      component.entryToEdit = { ...entryToEdit, activity_id: param.select_activity_id };
      spyOn(component.entryForm, 'patchValue');
      component.ngOnChanges();

      component.activities$.subscribe((items) => {
        expect(items.length).toBe(param.expected_size_activities);
      });
    });
  });

  it('selectActiveActivities should return 3 active activities', () => {
    const activeActivities = component.selectActiveActivities();

    activeActivities.subscribe((item) => {
      expect(item.length).not.toBe(null);
      expect(item.length).toBe(3);
    });
  });

  it('should call createError ', () => {
    const childComponent = jasmine.createSpyObj('ChildComponent', ['closeModal']);
    component.closeModal = childComponent;
    mockEntriesCreateErrorSelector = store.overrideSelector(getCreateError, false);
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.CleanEntryCreateError(null));
  });

  it('should call updateError ', () => {
    const childComponent = jasmine.createSpyObj('ChildComponent', ['closeModal']);
    component.closeModal = childComponent;
    mockEntriesUpdateErrorSelector = store.overrideSelector(getUpdateError, false);
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new entryActions.CleanEntryUpdateError(null));
  });

  it('should emit saveEntry event', () => {
    spyOn(component.saveEntry, 'emit');
    component.entryForm.setValue({
      project_id: 'p1',
      project_name: 'p-name',
      activity_id: 'a1',
      uri: '',
      start_date: '2020-02-05',
      end_date: '2020-02-05',
      start_hour: '00:00',
      end_hour: '00:01',
      description: '',
      technology: '',
    });

    component.onSubmit();

    const data: SaveEntryEvent = {
      entry: {
        project_id: 'p1',
        activity_id: 'a1',
        technologies: [],
        description: '',
        start_date: new Date('2020-02-05T00:00:00').toISOString(),
        end_date: new Date('2020-02-05T00:01:00').toISOString(),
        uri: '',
        timezone_offset: new Date().getTimezoneOffset(),
      },
      shouldRestartEntry: false,
    };

    expect(component.saveEntry.emit).toHaveBeenCalledWith(data);
  });

  it('when the current entry is not running, then the end date and end hour inputs should be rendered', () => {
    component.goingToWorkOnThis = false;
    fixture.detectChanges();

    const endDateInput = fixture.debugElement.nativeElement.querySelector('#end_date');
    const endHourInput = fixture.debugElement.nativeElement.querySelector('#end_hour');

    expect(endDateInput).toBeDefined();
    expect(endHourInput).toBeDefined();
  });

  it('when  the current entry is running, then the end date and end hour inputs should not be rendered', () => {
    component.goingToWorkOnThis = true;
    fixture.detectChanges();

    const endDateInput = fixture.debugElement.nativeElement.querySelector('#end_date');
    const endHourInput = fixture.debugElement.nativeElement.querySelector('#end_hour');

    expect(endDateInput).toBeNull();
    expect(endHourInput).toBeNull();
  });

  it('when the current entry is not running, then the end_date and end_hour of the form should be set', () => {
    const startDate = new Date('2020-12-30T09:45:00');
    component.entryToEdit = { ...entryToEdit, start_date: startDate };
    spyOn(component.entryForm, 'patchValue');

    component.onGoingToWorkOnThisChange({ currentTarget: { checked: false } });

    expect(component.entryForm.patchValue).toHaveBeenCalledWith({
      end_date: '2020-12-30',
      end_hour: formatDate(new Date(), 'HH:mm', 'en'),
    });
  });

  it('when creating a new entry, then the new entry should be marked as not run', () => {
    component.entryToEdit = null;

    expect(component.goingToWorkOnThis).toBeFalse();
  });

  it('when editing entry that is currently running, then the entry should be marked as I am working on this', () => {
    component.entryToEdit = { ...entryToEdit, running: true };

    fixture.componentInstance.ngOnChanges();

    expect(component.goingToWorkOnThis).toBeTrue();
  });

  it('when editing entry that already finished, then the entry should not be marked as running', () => {
    component.entryToEdit = { ...entryToEdit, running: false };

    fixture.componentInstance.ngOnChanges();

    expect(component.goingToWorkOnThis).toBeFalse();
    expect(component.shouldRestartEntry).toBeFalse();
  });

  it('when editing entry is running, shouldRestartEntry should be false', () => {
    component.entryToEdit = { ...entryToEdit, running: true };

    fixture.componentInstance.ngOnChanges();

    expect(component.goingToWorkOnThis).toBeTrue();
    expect(component.shouldRestartEntry).toBeFalse();
  });

  it('when editing entry change to going to work on this shouldRestartEntry should be true', () => {
    component.onGoingToWorkOnThisChange({ currentTarget: { checked: true } });

    expect(component.goingToWorkOnThis).toBeTrue();
    expect(component.shouldRestartEntry).toBeTrue();
  });

  it('when submitting a entry that is currently running, the end date should not be sent ', () => {
    component.goingToWorkOnThis = true;
    spyOn(component.saveEntry, 'emit');

    component.entryForm.setValue({ ...formValues, start_date: '2020-06-11', end_date: '2020-06-11' });

    component.onSubmit();

    const data: SaveEntryEvent = {
      entry: {
        project_id: 'id',
        activity_id: 'a1',
        technologies: [],
        description: '',
        start_date: new Date('2020-06-11T00:00:00').toISOString(),
        uri: 'ticketUri',
        timezone_offset: new Date().getTimezoneOffset(),
      },
      shouldRestartEntry: false,
    };

    expect(component.saveEntry.emit).toHaveBeenCalledWith(data);
  });

  it('should modify the start_date when start_hour has been modified', () => {
    const startDate = new Date(mockCurrentDate);

    component.entryToEdit = { ...entryToEdit, start_date: startDate };
    fixture.componentInstance.ngOnChanges();

    const updatedStartDate = moment(startDate).subtract(1, 'hours');
    const updatedStartHour = updatedStartDate.format('HH:mm');
    component.entryForm.patchValue({ start_hour: updatedStartHour });

    const expectedStartDate = moment(updatedStartDate).seconds(0).millisecond(0).toISOString();
    expect(component.dateToSubmit('start_date', 'start_hour')).toEqual(expectedStartDate);
  });

  it('should modify the end_date when end_hour has been modified', () => {
    const endDate = new Date(mockCurrentDate);

    component.entryToEdit = { ...entryToEdit, end_date: endDate };
    fixture.componentInstance.ngOnChanges();

    const updatedEndDate = moment(endDate).subtract(1, 'hours');
    const updatedEndHour = updatedEndDate.format('HH:mm');
    component.entryForm.patchValue({ end_hour: updatedEndHour });

    const expectedEndDate = moment(updatedEndDate).seconds(0).millisecond(0).toISOString();
    expect(component.dateToSubmit('end_date', 'end_hour')).toEqual(expectedEndDate);
  });

  it('displays error message when the date selected is in the future', () => {
    spyOn(toastrServiceStub, 'error');

    const futureDate = moment().add(1, 'days').format(DATE_FORMAT_YEAR);
    component.entryForm.setValue({ ...formValues, start_date: futureDate, end_date: futureDate });
    component.onSubmit();

    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  it('when start_date is in the future and end_date is OK then throws an error', () => {
    spyOn(toastrServiceStub, 'error');

    const futureDate = moment().add(1, 'days').format(DATE_FORMAT_YEAR);
    const currentDate = moment().format(DATE_FORMAT_YEAR);
    component.entryForm.setValue({ ...formValues, start_date: futureDate, end_date: currentDate });
    component.onSubmit();

    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  it('when start_date is OK and end_date is in the future then throws an error future', () => {
    spyOn(toastrServiceStub, 'error');

    const futureDate = moment().add(1, 'days').format(DATE_FORMAT_YEAR);
    const currentDate = moment().format(DATE_FORMAT_YEAR);
    component.entryForm.setValue({ ...formValues, start_date: currentDate, end_date: futureDate });
    component.onSubmit();

    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  it('should emit projectSelected event', () => {
    spyOn(component.projectSelected, 'emit');
    const item = {
      id: 'id',
      search_field: 'TimeTracker',
    };
    component.onSelectedProject(item);

    const data: ProjectSelectedEvent = {
      projectId: 'id',
    };
    expect(component.projectSelected.emit).toHaveBeenCalledWith(data);
  });

  it('on selected start_date should change end_date', () => {
    const expectedStartDate = '2020-02-05';

    component.onStartDateChange(expectedStartDate);
    fixture.detectChanges();
    const endDateInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#end_date');

    expect(endDateInput.value).toEqual(expectedStartDate);
  });

  it('on selected end_date should not change start_date', () => {
    const expectedStartDate = '2020-02-05';
    const expectedEndDate = '2020-02-06';

    component.ngOnInit();
    fixture.detectChanges();
    const startDateInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#start_date');
    const endDateInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#end_date');
    startDateInput.value = expectedStartDate;
    endDateInput.value = expectedEndDate;
    endDateInput.dispatchEvent(new Event('#end_date'));

    expect(endDateInput.value).not.toEqual(startDateInput.value);
    expect(startDateInput.value).toEqual(expectedStartDate);
  });

  it('on get current date should return expected date', () => {
    const expectedDate = moment(new Date()).format(DATE_FORMAT_YEAR);

    expect(component.getCurrentDate()).toEqual(expectedDate);
  });

  it('on the input with id #start_date we could get the id and max value', () => {
    fixture.detectChanges();
    const expectedDate = moment(new Date()).format(DATE_FORMAT_YEAR);
    const startDateInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
      `input[id="start_date"],input[max="${component.getCurrentDate()}"]`
    );

    expect(startDateInput.id).toEqual('start_date');
    expect(startDateInput.max).toEqual(expectedDate);
  });

  it('on the input with id #end_date we could get the current Date ', () => {
    fixture.detectChanges();
    const expectedDate = moment(new Date()).format(DATE_FORMAT_YEAR);
    const endDateInput = fixture.debugElement.nativeElement.querySelector('[id=end_date]');

    expect(endDateInput.id).toEqual('end_date');
    expect(endDateInput.max).toEqual(expectedDate);
  });

  const diffParams = [
    {
      case: 'positive should return correctly diff',
      entryDates: {
        start_date: '2021-04-15',
        end_date: '2021-04-15',
        start_hour: '18:05',
        end_hour: '19:00',
      },
      expectedTimeDiff: '00:55',
    },
    {
      case: 'negative should return 00:00',
      entryDates: {
        start_date: '2021-04-15',
        end_date: '2021-04-14',
        start_hour: '18:05',
        end_hour: '17:00',
      },
      expectedTimeDiff: '00:00',
    },
  ];
  diffParams.forEach((param) => {
    it(`if [start_date, start_hour] and [end_date, end_hour] diff is ${param.case}`, () => {
      component.entryForm.setValue({ ...formValues, ...param.entryDates });
      const timeDiff = component.getTimeDifference();

      expect(timeDiff).toBe(param.expectedTimeDiff);
    });
  });

  it('should find an activity with given id & status: inactive', () => {
    const expectedActivity = {
      id: 'fc5fab41-a21e-4155-9d05-511b956ebd08',
      tenant_id: 'ioet_2',
      deleted: null,
      name: 'ghi',
      status: 'inactive',
    };

    component.entryToEdit = { ...entryToEdit, activity_id: 'fc5fab41-a21e-4155-9d05-511b956ebd08' };
    spyOn(component.entryForm, 'patchValue');

    const foundActivity = component.findInactiveActivity(state.activities.data);
    expect(foundActivity).toEqual(expectedActivity);
  });

  const datesParams = [
    {
      case: 'should return true when the start time entry is greater than the end time',
      entryDates: {
        start_date: '2021-04-21',
        end_date: '2021-04-21',
        start_hour: '20:00',
        end_hour: '08:00',
      },
      expected_result: true,
    },
    {
      case: 'should return false when the start time entry is not greater than the end time',
      entryDates: {
        start_date: '2021-04-21',
        end_date: '2021-04-21',
        start_hour: '19:00',
        end_hour: '20:00',
      },
      expected_result: false,
    },
  ];
  datesParams.forEach((param) => {
    it(`${param.case}`, () => {
      component.entryForm.setValue({ ...formValues, ...param.entryDates });
      const result = component.isStartTimeEntryAfterEndedEntry();

      expect(result).toBe(param.expected_result);
    });
  });

  it('should display an error message when isStartTimeEntryAfterEndedEntry() is true & goingToWorkOnThis is false', () => {
    const times = {
      start_date: '2021-04-21',
      end_date: '2021-04-21',
      start_hour: '10:00',
      end_hour: '00:00',
    };
    component.goingToWorkOnThis = false;
    component.entryForm.setValue({ ...formValues, ...times });
    const displayError = component.isStartTimeEntryAfterEndedEntry() && !component.goingToWorkOnThis;
    component.onSubmit();
    expect(displayError).toBeTrue();
  });

  it('should show Date out field on details field component on time entry page when another entry is running', () => {
    const times = {
      start_date: '2021-04-21',
      end_date: '2021-04-21',
      start_hour: '10:00',
      end_hour: '12:00',
    };
    component.goingToWorkOnThis = true;
    spyOn(toastrServiceStub, 'error');

    const fixtureToTest = TestBed.createComponent(DetailsFieldsComponent);
    const componentToTest = fixtureToTest.componentInstance;
    componentToTest.entryForm.setValue({ ...formValues, ...times });
    componentToTest.onSubmit();
    expect(toastrServiceStub.error).not.toHaveBeenCalled();
  });

  it('Should return a date in ISO format given a date, hour, minute, second and milisecond', () => {
    const fakeDates = [
      {
        date: '2021-04-20',
        hourAndMinutes: '10:00',
        seconds: 20,
        miliseconds: 100,
      },
      {
        date: '2020-09-21',
        hourAndMinutes: '08:00',
        seconds: 10,
        miliseconds: 100,
      },
      {
        date: '2021-04-15',
        hourAndMinutes: '23:00',
        seconds: 0,
        miliseconds: 0,
      },
      {
        date: '2019-03-29',
        hourAndMinutes: '12:00',
        seconds: 30,
        miliseconds: 400,
      },
    ];

    const expectedISODates = [
      new Date('2021-04-20T10:00:20.100').toISOString(),
      new Date('2020-09-21T08:00:10.100').toISOString(),
      new Date('2021-04-15T23:00:00.000').toISOString(),
      new Date('2019-03-29T12:00:30.400').toISOString(),
    ];

    fakeDates.forEach(({ date, hourAndMinutes, seconds, miliseconds }, fakeDateIndex) => {
      const dateInISOFormat = component.getDateISOFormat(date, hourAndMinutes, seconds, miliseconds);
      expect(dateInISOFormat).toBe(expectedISODates[fakeDateIndex]);
    });
  });

  it('should return a number in ISO format given a normal number', () => {
    const numbersForTest = [1, 2, 3, 4, 20, 30, 40, 32, 45];

    const expectedISOFormatNumbers = ['01', '02', '03', '04', '20', '30', '40', '32', '45'];

    numbersForTest.forEach((currentNumber, numberIndex) => {
      const numberinISOFormat = component.getNumberInISOFormat(currentNumber);
      expect(numberinISOFormat).toBe(expectedISOFormatNumbers[numberIndex]);
    });
  });
  /*
   TODO As part of https://github.com/ioet/time-tracker-ui/issues/424 a new parameter was added to the details-field-component,
   and now these couple of tests are failing. A solution to this error might be generate a Test Wrapper Component. More details here:
   https://medium.com/better-programming/testing-angular-components-with-input-3bd6c07cfaf6
  */

  //   it('when disabling going to work on this, then the end hour should be set to the current time', () => {
  //     const datePipe: DatePipe = new DatePipe('en');
  //     const currentTime = datePipe.transform(new Date(), 'HH:mm:ss');
  //     const checkIsEntryRunning: Element = fixture.debugElement.nativeElement.querySelector('#isEntryRunning');
  //     checkIsEntryRunning.dispatchEvent(new Event('change'));
  //     fixture.detectChanges();

  //     const endHourInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#end_hour');
  //     expect(endHourInput.value).toEqual(currentTime);
  //   });

  //   it('given going to work on this and the entry is not currently running, when submitting
  //       form then the entry should be restarted', () => {
  //     component.goingToWorkOnThis = false;
  //     component.entryToEdit = { ...entryToEdit, running: false };

  //     const checkIsEntryRunning: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#isEntryRunning');
  //     checkIsEntryRunning.click();
  //     fixture.detectChanges();

  //     expect(component.shouldRestartEntry).toBeTrue();
  //   });
});
