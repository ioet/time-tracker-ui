import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { StopTimeEntryRunning, EntryActionTypes, LoadEntriesSummary } from './../store/entry.actions';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TimeClockComponent } from './time-clock.component';
import { ProjectState } from '../../customer-management/components/projects/components/store/project.reducer';
import { ProjectListHoverComponent } from '../components';
import { FilterProjectPipe } from '../../shared/pipes';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { ActionsSubject } from '@ngrx/store';
import { EntryFieldsComponent } from '../components/entry-fields/entry-fields.component';
import { ToastrService } from 'ngx-toastr';

describe('TimeClockComponent', () => {
  let component: TimeClockComponent;
  let fixture: ComponentFixture<TimeClockComponent>;
  let store: MockStore<ProjectState>;
  let azureAdB2CService: AzureAdB2CService;
  const actionSub: ActionsSubject = new ActionsSubject();

  let injectedToastrService;
  const toastrService = {
    error: () => {},
  };

  const state = {
    projects: {
      projects: [{ id: 'id', name: 'name', project_type_id: '', customer: { name: 'customer', description: '' } }],
      customerProjects: [{ id: 'id', name: 'name', description: 'description' }],
      isLoading: false,
    },
    activities: {
      data: [{ id: 'id', name: 'name', description: 'description' }],
      isLoading: false,
      message: 'message',
    },
    entries: {
      active: {
        id: 'id',
        project_id: '2b87372b-3d0d-4dc0-832b-ae5863cd39e5',
        start_date: '2020-04-23T16:11:06.455000+00:00',
        technologies: ['java', 'typescript'],
      },
      entryList: [],
      isLoading: false,
      message: '',
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TimeClockComponent, ProjectListHoverComponent, FilterProjectPipe, EntryFieldsComponent],
        providers: [
          FormBuilder,
          AzureAdB2CService,
          provideMockStore({ initialState: state }),
          { provide: ActionsSubject, useValue: actionSub },
          { provide: ToastrService, useValue: toastrService },
        ],
      }).compileComponents();
      store = TestBed.inject(MockStore);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
    injectedToastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('on STOP_TIME_ENTRY_RUNNING_SUCCESS summaries are reloaded', () => {
    const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
    const action = {
      type: EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS,
    };
    spyOn(store, 'dispatch');

    actionSubject.next(action);

    expect(store.dispatch).toHaveBeenCalledWith(new LoadEntriesSummary());
  });

  it('register reloadSummaries on ngOnInit', () => {
    spyOn(component, 'reloadSummariesOnClockOut');

    component.ngOnInit();

    expect(component.reloadSummariesOnClockOut).toHaveBeenCalled();
  });

  it('unsubscribe clockOutSubscription, storeSubscription onDestroy', () => {
    spyOn(component.clockOutSubscription, 'unsubscribe');
    spyOn(component.storeSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.clockOutSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.storeSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('onInit checks if isLogin and gets the userName', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalled();
  });

  it('onInit does not get the name if isLogin false', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(azureAdB2CService, 'getName').and.returnValue('Name');
    component.ngOnInit();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(azureAdB2CService.getName).toHaveBeenCalledTimes(0);
  });

  it('stopEntry dispatch a StopTimeEntryRunning action', () => {
    spyOn(store, 'dispatch');

    component.stopEntry();
    expect(store.dispatch).toHaveBeenCalledWith(new StopTimeEntryRunning('id'));
  });

  it('clockOut dispatch a StopTimeEntryRunning action', () => {
    spyOn(store, 'dispatch');
    spyOn(component.entryFieldsComponent, 'entryFormIsValidate').and.returnValue(true);
    component.clockOut();

    expect(store.dispatch).toHaveBeenCalledWith(new StopTimeEntryRunning('id'));
  });

  it('clockOut set error Activity is required', () => {
    spyOn(store, 'dispatch');
    spyOn(injectedToastrService, 'error');
    spyOn(component.entryFieldsComponent, 'entryFormIsValidate').and.returnValue(false);
    component.clockOut();

    expect(injectedToastrService.error).toHaveBeenCalled();
  });
});
