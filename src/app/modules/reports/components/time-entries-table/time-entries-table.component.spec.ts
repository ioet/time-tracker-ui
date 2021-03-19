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
      project_name: 'Time-Tracker',
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
        isLoading: false,
      },
      reportDataSource: {
        data: [timeEntry],
        isLoading: false,
      },
    };

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [],
          declarations: [TimeEntriesTableComponent, SubstractDatePipe],
          providers: [provideMockStore({ initialState: state })],
        }).compileComponents();
        store = TestBed.inject(MockStore);
      })
    );

    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.createComponent(TimeEntriesTableComponent);
        component = fixture.componentInstance;
        store.setState(state);
        getReportDataSourceSelectorMock = store.overrideSelector(getReportDataSource, state.reportDataSource);
        fixture.detectChanges();
      })
    );

    it('component should be created', async () => {
      expect(component).toBeTruthy();
    });

    it('on success load time entries, the report should be populated', () => {
      component.reportDataSource$.subscribe((ds) => {
        expect(ds.data).toEqual(state.reportDataSource.data);
      });
    });

    it('after the component is initialized it should initialize the table', () => {
      spyOn(component.dtTrigger, 'next');
      component.ngAfterViewInit();

      expect(component.dtTrigger.next).toHaveBeenCalled();
    });

    it('when the uri starts with http or https it should return true and open the url in a new tab', () => {
      const url = 'http://customuri.com';
      spyOn(component, 'isURL').and.returnValue(true);
      spyOn(window, 'open');

      expect(component.openURLInNewTab(url)).not.toEqual('');
      expect(window.open).toHaveBeenCalledWith(url, '_blank');
    });

    it('when the uri starts without http or https it should return false and not navigate or open a new tab', () => {
      const uriExpected = timeEntry.uri;
      spyOn(component, 'isURL').and.returnValue(false);

      expect(component.openURLInNewTab(uriExpected)).toEqual('');
    });

    const params = [
      {url: 'http://example.com', expected_value: true, with: 'with'},
      {url: 'https://example.com', expected_value: true, with: 'with'},
      {url: 'no-url-example', expected_value: false, with: 'without'}
    ];
    params.map((param) => {
      it(`when the url starts ${param.with} http or https it should return ${param.expected_value}`, () => {

      expect(component.isURL(param.url)).toEqual(param.expected_value);
      });
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
