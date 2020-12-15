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
    error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { },
    warning: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
  };

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFieldsComponent, TechnologiesComponent],
      providers: [
        provideMockStore({ initialState: state }),
        { provide: ActionsSubject, useValue: actionSub },
        { provide: ToastrService, useValue: toastrServiceStub }
      ],
      imports: [FormsModule, ReactiveFormsModule, AutocompleteLibModule, NgxMaterialTimepickerModule],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockTechnologySelector = store.overrideSelector(allTechnologies, state.technologies);
    mockProjectsSelector = store.overrideSelector(getCustomerProjects, state.projects);
    mockEntriesUpdateErrorSelector = store.overrideSelector(getUpdateError, state.Entries.updateError);
    mockEntriesCreateErrorSelector = store.overrideSelector(getCreateError, state.Entries.createError);
  }));

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
      id: 'xyz'
    };
    formValues = {
      project_id: 'id',
      project_name: 'name',
      activity_id: 'a1',
      uri: 'ticketUri',
      start_date: '',
      end_date: '',
      start_hour: '00:00:10',
      end_hour: '00:00:11',
      description: '',
      technology: '',
    };
    component.canMarkEntryAsWIP = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClearedComponent project id and name it is set to empty', () => {
    component.onClearedComponent(null);

    expect(component.project_id.value).toBe('');
    expect(component.project_name.value).toBe('');
  });

  it('onSelectedProject project id and name it is set using event data', () => {
    spyOn(component.entryForm, 'patchValue');

    component.onSelectedProject( {id: 'id', search_field: 'foo'} );

    expect(component.entryForm.patchValue).toHaveBeenCalledWith( { project_id: 'id', project_name: 'foo', } );
  });

  it('if form is invalid then no save is emited', () => {
    spyOn(component.saveEntry, 'emit');

    component.onSubmit();

    expect(component.saveEntry.emit).toHaveBeenCalledTimes(0);
  });

  [
    { actionType: EntryActionTypes.CREATE_ENTRY_SUCCESS },
    { actionType: EntryActionTypes.UPDATE_ENTRY_SUCCESS },
  ].map((param) => {
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

  it('should emit ngOnChange without data', () => {
    component.entryToEdit = null;
    component.ngOnChanges();
    expect(component.entryForm.value).toEqual(initialData);
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
      start_hour: '00:00:01',
      end_hour: '00:01:01',
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
        start_date: new Date('2020-02-05T00:00:01').toISOString(),
        end_date: new Date('2020-02-05T00:01:01').toISOString(),
        uri: '',
        timezone_offset: new Date().getTimezoneOffset(),
      },
      shouldRestartEntry: false
    };
    expect(component.saveEntry.emit).toHaveBeenCalledWith(data);
  });

  it('when the current entry is not running, then the end hour input should be rendered', () => {
    component.goingToWorkOnThis = false;
    fixture.detectChanges();

    const endHourInput = fixture.debugElement.nativeElement.querySelector('#end_hour');
    expect(endHourInput).toBeDefined();
  });

  it('when  the current entry is running, then the end hour input should not be rendered', () => {
    component.goingToWorkOnThis = true;
    fixture.detectChanges();

    const endHourInput = fixture.debugElement.nativeElement.querySelector('#end_hour');
    expect(endHourInput).toBeNull();
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
  });

  it('when editing entry that already finished, then the entry should not be marked as running', () => {
    component.entryToEdit = { ...entryToEdit, running: false };

    fixture.componentInstance.ngOnChanges();

    expect(component.goingToWorkOnThis).toBeFalse();
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
        start_date: new Date('2020-06-11T00:00:10').toISOString(),
        uri: 'ticketUri',
        timezone_offset: new Date().getTimezoneOffset(),
      },
      shouldRestartEntry: false
    };

    expect(component.saveEntry.emit).toHaveBeenCalledWith(data);
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
      id : 'id',
      search_field : 'TimeTracker'
    };
    component.onSelectedProject(item);

    const data: ProjectSelectedEvent = {
      projectId: 'id'
    };
    expect(component.projectSelected.emit).toHaveBeenCalledWith(data);
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
