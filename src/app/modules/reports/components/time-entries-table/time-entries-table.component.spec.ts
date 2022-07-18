import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { Entry } from 'src/app/modules/shared/models';
import { SubstractDatePipe } from 'src/app/modules/shared/pipes/substract-date/substract-date.pipe';
import { getReportDataSource } from 'src/app/modules/time-clock/store/entry.selectors';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { TimeEntriesTableComponent } from './time-entries-table.component';
import { TotalHours } from '../../models/total-hours-report';
import { ActionsSubject } from '@ngrx/store';
import { UserActionTypes } from 'src/app/modules/users/store';

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

    const timeEntryList: Entry[] = [
      {
        id: '123',
        start_date: new Date('2022-04-24T11:30:00Z'),
        end_date: new Date('2022-04-24T14:30:00Z'),
        activity_id: '123',
        technologies: ['react', 'redux'],
        description: 'any comment',
        uri: 'custom uri',
        project_id: '123',
        project_name: 'Time-Tracker',
      },
      {
        id: '456',
        start_date: new Date('2022-04-25T12:40:00Z'),
        end_date: new Date('2022-04-25T13:00:00Z'),
        activity_id: '123',
        technologies: ['react', 'redux'],
        description: 'any comment',
        uri: 'custom uri',
        project_id: '123',
        project_name: 'Time-Tracker',
      }
    ];

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

    const actionSub: ActionsSubject = new ActionsSubject();

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [NgxPaginationModule, DataTablesModule],
          declarations: [TimeEntriesTableComponent, SubstractDatePipe],
          providers: [provideMockStore({ initialState: state }), { provide: ActionsSubject, useValue: actionSub }],
        }).compileComponents();

      })
    );

    beforeEach(
      () => {
        fixture = TestBed.createComponent(TimeEntriesTableComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        store.setState(state);
        getReportDataSourceSelectorMock = store.overrideSelector(getReportDataSource, state.reportDataSource);
        fixture.detectChanges();
      }
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

    it('after the component is initialized it should initialize the table', () => {
      component.dtElement = null;
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
      const url = timeEntry.uri;
      spyOn(component, 'isURL').and.returnValue(false);

      expect(component.openURLInNewTab(url)).toEqual('');
    });

    const params = [
      { url: 'http://example.com', expected_value: true },
      { url: 'https://example.com', expected_value: true },
      { url: 'no-url-example', expected_value: false }
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
      expect(component.bodyExportOptions(durationTime, row, column, node)).toBe(durationTime.toString());
    });

    it('The link Ticket must not contain the ticket URL enclosed with < > when export a file csv, excel or PDF', () => {
      const entry = '<a _ngcontent-vlm-c151="" class="is-url">https://TT-392-uri</a>';
      const column = 0;
      expect(component.bodyExportOptions(entry, row, column, node)).toBe('https://TT-392-uri');
    });

    it('when the rerenderDataTable method is called and dtElement and dtInstance are defined, the destroy and next methods are called ',
      () => {
        spyOn(component.dtTrigger, 'next');

        component.ngAfterViewInit();

        component.dtElement.dtInstance.then((dtInstance) => {
          expect(component.dtTrigger.next).toHaveBeenCalled();
        });
      });

    it(`When the user method is called, the emit method is called`, () => {
      const userId = 'abc123';
      spyOn(component.selectedUserId, 'emit');
      component.user(userId);
      expect(component.selectedUserId.emit).toHaveBeenCalled();

    });

    it('Should populate the users with the payload from the action executed', () => {
      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const usersArray = [];
      const action = {
        type: UserActionTypes.LOAD_USERS_SUCCESS,
        payload: usersArray
      };

      actionSubject.next(action);


      expect(component.users).toEqual(usersArray);
    });

    it('The sum of the data dates is equal to {"hours": 3, "minutes":20,"seconds":0}', () => {
      const { hours, minutes, seconds }: TotalHours = component.sumDates(timeEntryList);
      expect({ hours, minutes, seconds }).toEqual({ hours: 3, minutes: 20, seconds: 0 });
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
