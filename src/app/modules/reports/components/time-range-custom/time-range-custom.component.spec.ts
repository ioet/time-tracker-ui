import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TimeRangeCustomComponent } from './time-range-custom.component';
import { ToastrService } from 'ngx-toastr';
import { EntryState } from 'src/app/modules/time-clock/store/entry.reducer';
import * as entryActions from '../../../time-clock/store/entry.actions';
import * as moment from 'moment';
import { SimpleChange } from '@angular/core';

describe('TimeRangeCustomComponent', () => {
  let component: TimeRangeCustomComponent;
  let fixture: ComponentFixture<TimeRangeCustomComponent>;
  let store: MockStore<EntryState>;
  const toastrServiceStub = {
    error: () => {
      return 'test error';
    },
  };

  const timeEntry = {
    id: '1',
    start_date: new Date(),
    end_date: new Date(),
    activity_id: '1',
    technologies: ['react', 'redux'],
    comments: 'any comment',
    uri: 'TT-123',
    project_id: '1',
  };

  const state = {
    active: timeEntry,
    entryList: [timeEntry],
    isLoading: false,
    message: 'test',
    createError: false,
    updateError: false,
    timeEntriesSummary: null,
    entriesForReport: [timeEntry],
  };

  const [userId, projectId, activityId] = ['test-userId', 'test-projectId', 'test-activityId'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TimeRangeCustomComponent],
      providers: [provideMockStore({ initialState: state }), { provide: ToastrService, useValue: toastrServiceStub }],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setInitialDataOnScreen on ngOnInit', () => {
    spyOn(component, 'setInitialDataOnScreen');

    component.ngOnInit();

    expect(component.setInitialDataOnScreen).toHaveBeenCalled();
  });

  it('LoadEntriesByTimeRange action is triggered when start date is before end date', () => {
    const end = moment(new Date()).subtract(1, 'days');
    const start = moment(new Date());
    spyOn(store, 'dispatch');
    component.range.controls.start.setValue(end);
    component.range.controls.end.setValue(start);

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      new entryActions.LoadEntriesByTimeRange({
        start_date: end.startOf('day'),
        end_date: start.endOf('day'),
      })
    );
  });

  it('shows an error when the end date is before the start date', () => {
    spyOn(toastrServiceStub, 'error');
    const yesterday = moment(new Date()).subtract(2, 'days');
    const today = moment(new Date());
    spyOn(store, 'dispatch');
    component.range.controls.start.setValue(today);
    component.range.controls.end.setValue(yesterday);

    component.onSubmit();

    expect(toastrServiceStub.error).toHaveBeenCalled();
  });

  it('setInitialDataOnScreen sets dates in form', () => {
    spyOn(component.range.controls.start, 'setValue');
    spyOn(component.range.controls.end, 'setValue');

    component.setInitialDataOnScreen();

    expect(component.range.controls.start.setValue).toHaveBeenCalled();
    expect(component.range.controls.end.setValue).toHaveBeenCalled();
  });

  it('triggers onSubmit to set initial data', () => {
    spyOn(component, 'onSubmit');

    component.setInitialDataOnScreen();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('When the ngOnChanges method is called, the onSubmit method is called', () => {
    spyOn(component, 'onSubmit');

    component.ngOnChanges({
      userId: new SimpleChange(null, userId, false),
      projectId: new SimpleChange(null, projectId, false),
      activityId: new SimpleChange(null, activityId, false),
    });

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('When the ngOnChanges method is the first change, the onSubmit method is not called', () => {
    spyOn(component, 'onSubmit');

    component.ngOnChanges({
      userId: new SimpleChange(null, userId, true),
      projectId: new SimpleChange(null, projectId, true),
      activityId: new SimpleChange(null, activityId, true),
    });

    expect(component.onSubmit).not.toHaveBeenCalled();
  });

  it('should call range form and delete variable local storage ', () => {
    spyOn(localStorage, 'removeItem').withArgs('rangeDatePicker');
    component.range.setValue({ start: null, end: null });
    jasmine.clock().install();
    component.dateRangeChange();
    jasmine.clock().tick(200);
    expect(localStorage.removeItem).toHaveBeenCalledWith('rangeDatePicker');
    jasmine.clock().uninstall();
  });
});
