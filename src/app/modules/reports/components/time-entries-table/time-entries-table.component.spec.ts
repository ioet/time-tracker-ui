import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Entry } from 'src/app/modules/shared/models';
import { SubstractDatePipe } from 'src/app/modules/shared/pipes/substract-date/substract-date.pipe';
import { getReportDataSource } from 'src/app/modules/time-clock/store/entry.selectors';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { TimeEntriesTableComponent } from './time-entries-table.component';

describe('Reports Page', () => {
  describe('TimeEntriesTableComponent', () => {
    let component: TimeEntriesTableComponent;
    let fixture: ComponentFixture<TimeEntriesTableComponent>;
    let store: MockStore<EntryState>;
    let getReportDataSourceSelectorMock;
    const timeEntry: Entry = {
      id: '123',
      start_date: new Date(),
      end_date: new Date(),
      activity_id: '123',
      technologies: ['react', 'redux'],
      description: 'any comment',
      uri: 'custom uri',
      project_id: '123',
      project_name: 'Time-Tracker'
    };

    const state: EntryState = {
      active: timeEntry,
      isLoading: false,
      message: '',
      createError: false,
      updateError: false,
      timeEntriesSummary: null,
      timeEntriesDataSource: {
        data: [timeEntry],
        isLoading: false
      },
      reportDataSource: {
        data: [timeEntry],
        isLoading: false
      }
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [TimeEntriesTableComponent, SubstractDatePipe],
        providers: [provideMockStore({ initialState: state })],
      }).compileComponents();
      store = TestBed.inject(MockStore);

    }));

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(TimeEntriesTableComponent);
      component = fixture.componentInstance;
      store.setState(state);
      getReportDataSourceSelectorMock = store.overrideSelector(getReportDataSource, state.reportDataSource);
      fixture.detectChanges();
    }));

    it('component should be created', async () => {
      expect(component).toBeTruthy();
    });

    it('on success load time entries, the report should be populated', () => {
      component.reportDataSource$.subscribe(ds => {
        expect(ds.data).toEqual(state.reportDataSource.data);
      });
    });

    it('after the component is initialized it should initialize the table', () => {
      spyOn(component.dtTrigger, 'next');
      component.ngAfterViewInit();

      expect(component.dtTrigger.next).toHaveBeenCalled();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
