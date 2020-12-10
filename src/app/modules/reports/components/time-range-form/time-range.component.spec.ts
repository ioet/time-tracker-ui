import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TimeRangeFormComponent } from './time-range-form.component';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDateComponent } from '../../../shared/components/input-date/input-date.component';
import * as entryActions from '../../../time-clock/store/entry.actions';
import * as moment from 'moment';

describe('Reports Page', () => {
  describe('TimeRangeFormComponent', () => {
    let component: TimeRangeFormComponent;
    let fixture: ComponentFixture<TimeRangeFormComponent>;
    let store: MockStore<EntryState>;
    const toastrServiceStub = {
      error: (message?: string, title?: string, override?: Partial<IndividualConfig>) => { }
    };

    const timeEntry = {
      id: '123',
      start_date: new Date(),
      end_date: new Date(),
      activity_id: '123',
      technologies: ['react', 'redux'],
      comments: 'any comment',
      uri: 'custom uri',
      project_id: '123'
    };

    const state = {
      active: timeEntry,
      entryList: [timeEntry],
      isLoading: false,
      message: '',
      createError: false,
      updateError: false,
      timeEntriesSummary: null,
      entriesForReport: [timeEntry],
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [TimeRangeFormComponent, InputDateComponent],
        providers: [
          provideMockStore({ initialState: state }),
          { provide: ToastrService, useValue: toastrServiceStub }
        ],
      }).compileComponents();
      store = TestBed.inject(MockStore);

    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimeRangeFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('component should be created', () => {
      expect(component).toBeTruthy();
    });

    it('LoadEntriesByTimeRange action is triggered when start date is before end date', () => {
      const yesterday = moment(new Date()).subtract(1, 'days');
      const today = moment(new Date());
      spyOn(store, 'dispatch');
      component.reportForm.controls.startDate.setValue(yesterday);
      component.reportForm.controls.endDate.setValue(today);

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(new entryActions.LoadEntriesByTimeRange({
        start_date: yesterday.startOf('day'),
        end_date: today.endOf('day')
      }));
    });

    it('setInitialDataOnScreen on ngOnInit', () => {
      spyOn(component, 'setInitialDataOnScreen');

      component.ngOnInit();

      expect(component.setInitialDataOnScreen).toHaveBeenCalled();
    });

    it('shows an error when the end date is before the start date', () => {
      spyOn(toastrServiceStub, 'error');
      const yesterday = moment(new Date()).subtract(1, 'days');
      const today = moment(new Date());
      spyOn(store, 'dispatch');
      component.reportForm.controls.startDate.setValue(today);
      component.reportForm.controls.endDate.setValue(yesterday);

      component.onSubmit();

      expect(toastrServiceStub.error).toHaveBeenCalled();
    });

    it('setInitialDataOnScreen sets dates in form', () => {
      spyOn(component.reportForm, 'setValue');

      component.setInitialDataOnScreen();

      expect(component.reportForm.setValue).toHaveBeenCalled();
    });

    it('triggers onSubmit to set initial data', () => {
      spyOn(component, 'onSubmit');

      component.setInitialDataOnScreen();

      expect(component.onSubmit).toHaveBeenCalled();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
