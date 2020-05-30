import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TimeRangeFormComponent} from './time-range-form.component';
import {EntryState} from '../../../time-clock/store/entry.reducer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputDateComponent} from '../../../shared/components/input-date/input-date.component';
import * as entryActions from '../../../time-clock/store/entry.actions';

describe('Reports Page', () => {
  describe('TimeRangeFormComponent', () => {
    let component: TimeRangeFormComponent;
    let fixture: ComponentFixture<TimeRangeFormComponent>;
    let store: MockStore<EntryState>;
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

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [TimeRangeFormComponent, InputDateComponent],
        providers: [provideMockStore({initialState: state})],
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

    it('when submitting form a new LoadEntriesByTimeRange action is triggered', () => {

      const startDateValue = new Date();
      const endDateValue = new Date();
      endDateValue.setMonth(1);
      spyOn(store, 'dispatch');
      component.reportForm.controls.startDate.setValue(startDateValue);
      component.reportForm.controls.endDate.setValue(endDateValue);

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(new entryActions.LoadEntriesByTimeRange({
        start_date: startDateValue,
        end_date: endDateValue,
      }));
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
