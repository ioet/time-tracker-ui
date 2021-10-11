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
    let durationTime: number;
    let row: number;
    let node: number;
    let decimalValidator: RegExp;
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

    beforeEach(() => {
      durationTime = new Date().setHours(5, 30);
      row = 0;
      node = 0;
      decimalValidator = /^\d+\.\d{0,2}$/;
    });

    it('component should be created', async () => {
      expect(component).toBeTruthy();
    });

    it('on success load time entries, the report should be populated', () => {
      component.reportDataSource$.subscribe((ds) => {
        expect(ds.data).toEqual(state.reportDataSource.data);
      });
    });

    it('when the uri starts with http or https it should return true and open the url in a new tab', () => {
      const url = 'http://customuri.com';
      spyOn(component, 'isURL').and.returnValue(true);
      spyOn(window, 'open');

      expect(component.openURLInNewTab(url)).not.toEqual('');
      expect(window.open).toHaveBeenCalledWith(url, '_blank');
    });

    it('when the uri starts without http or https it should return false and not navigate or open a new tab', () => {
      const url = timeEntry.uri;
      spyOn(component, 'isURL').and.returnValue(false);

      expect(component.openURLInNewTab(url)).toEqual('');
    });

    const params = [
      {url: 'http://example.com', expected_value: true},
      {url: 'https://example.com', expected_value: true},
      {url: 'no-url-example', expected_value: false}
    ];
    params.map((param) => {
      it(`Given the url ${param.url}, the method isURL should return ${param.expected_value}`, () => {

      expect(component.isURL(param.url)).toEqual(param.expected_value);
      });
    });

    it('The data should be displayed as a multiple of hour when column is equal to 3', () => {
      const column = 3;

      expect(component.bodyExportOptions(durationTime, row, column, node)).toMatch(decimalValidator);
    });

    it('The data should not be displayed as a multiple of hour when column is different of 3', () => {
      const column = 4;
      expect(component.bodyExportOptions(durationTime, row, column, node)).toBe(durationTime);
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
