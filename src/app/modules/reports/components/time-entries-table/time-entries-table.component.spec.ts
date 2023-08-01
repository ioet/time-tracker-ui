import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { Activity, Entry } from 'src/app/modules/shared/models';
import { SubstractDatePipe } from 'src/app/modules/shared/pipes/substract-date/substract-date.pipe';
import { SubstractDatePipeDisplayAsFloat } from 'src/app/modules/shared/pipes/substract-date-return-float/substract-date-return-float.pipe';
import { getReportDataSource, getResultSumEntriesSelected } from 'src/app/modules/time-clock/store/entry.selectors';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { TimeEntriesTableComponent } from './time-entries-table.component';
import { TotalHours } from '../../models/total-hours-report';
import { ActionsSubject } from '@ngrx/store';
import { UserActionTypes } from 'src/app/modules/users/store';
import { ProjectActionTypes } from 'src/app/modules/customer-management/components/projects/components/store/project.actions';
import { Project } from 'src/app/modules/shared/models';
import { Customer } from 'src/app/modules/shared/models';
import { SearchUserComponent } from 'src/app/modules/shared/components/search-user/search-user.component';
import { SearchProjectComponent } from 'src/app/modules/shared/components/search-project/search-project.component';
import { SearchActivityComponent } from 'src/app/modules/shared/components/search-activity/search-activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivityManagementActionTypes } from 'src/app/modules/activities-management/store';

describe('Reports Page', () => {
  describe('TimeEntriesTableComponent', () => {
    let component: TimeEntriesTableComponent;
    let fixture: ComponentFixture<TimeEntriesTableComponent>;
    let store: MockStore<EntryState>;
    let getReportDataSourceSelectorMock;
    let row: number;
    let node: number;
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
      timezone_offset: 300,
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
      },
    ];

    const state: EntryState = {
      active: timeEntry,
      isLoading: false,
      resultSumEntriesSelected: new TotalHours(),
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
          imports: [
            NgxPaginationModule,
            DataTablesModule,
            MatCheckboxModule,
            NgSelectModule,
            FormsModule,
            ReactiveFormsModule,
          ],
          declarations: [
            TimeEntriesTableComponent,
            SubstractDatePipe,
            SubstractDatePipeDisplayAsFloat,
            SearchUserComponent,
            SearchProjectComponent,
            SearchActivityComponent,
          ],
          providers: [provideMockStore({ initialState: state }), { provide: ActionsSubject, useValue: actionSub }],
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TimeEntriesTableComponent);
      component = fixture.componentInstance;
      store = TestBed.inject(MockStore);
      store.setState(state);
      getReportDataSourceSelectorMock =
        (store.overrideSelector(getReportDataSource, state.reportDataSource),
        store.overrideSelector(getResultSumEntriesSelected, state.resultSumEntriesSelected));
      fixture.detectChanges();
    });

    beforeEach(() => {
      row = 0;
      node = 0;
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
      { url: 'no-url-example', expected_value: false },
    ];
    params.map((param) => {
      it(`Given the url ${param.url}, the method isURL should return ${param.expected_value}`, () => {
        expect(component.isURL(param.url)).toEqual(param.expected_value);
      });
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
        payload: usersArray,
      };

      actionSubject.next(action);

      expect(component.users).toEqual(usersArray);
    });

    it('The sum of the data dates is equal to {"hours": 3, "minutes":20,"seconds":0}', () => {
      const { hours, minutes, seconds }: TotalHours = component.sumDates(timeEntryList);
      expect({ hours, minutes, seconds }).toEqual({ hours: 3, minutes: 20, seconds: 0 });
    });

    it('the sume of hours of entries selected is equal to {hours:0, minutes:0, seconds:0}', () => {
      let checked = true;
      let { hours, minutes, seconds }: TotalHours = component.sumHoursEntriesSelected(timeEntryList[0], checked);
      checked = false;
      ({ hours, minutes, seconds } = component.sumHoursEntriesSelected(timeEntryList[0], checked));
      expect({ hours, minutes, seconds }).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    });

    it('should export data with the correct format', () => {
      const data = [
        '<mat-checkbox _ngcontent-tst-c180="" class="mat-checkbox mat-accent" id="mat-checkbox-27"><label class="mat-checkbox-layout" for="mat-checkbox-27-input"><span class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"><input type="checkbox" class="mat-checkbox-input cdk-visually-hidden" id="mat-checkbox-27-input" tabindex="0" aria-checked="false"><span matripple="" class="mat-ripple mat-checkbox-ripple mat-focus-indicator" ng-reflect-trigger="[object HTMLLabelElement]" ng-reflect-disabled="false" ng-reflect-radius="20" ng-reflect-centered="true" ng-reflect-animation="[object Object]"><span class="mat-ripple-element mat-checkbox-persistent-ripple"></span></span><span class="mat-checkbox-frame"></span><span class="mat-checkbox-background"><svg version="1.1" focusable="false" viewBox="0 0 24 24" xml:space="preserve" class="mat-checkbox-checkmark"><path fill="none" stroke="white" d="M4.1,12.7 9,17.6 20.3,6.3" class="mat-checkbox-checkmark-path"></path></svg><span class="mat-checkbox-mixedmark"></span></span></span><span class="mat-checkbox-label"><span style="display: none;">&nbsp;</span></span></label></mat-checkbox>',
        '19',
        'user@ioet.com',
        '07/01/2022',
        '09:00',
        '09:00',
        '18:00',
        'Project_Name',
        '3',
        'Customer_Name',
        '3',
        'Activity_Name',
        `<a _ngcontent-tst-c180="" class="is-url ng-star-inserted"> https://ioetec.atlassian.net/browse/CB-115 </a><!--ng-container--><!--bindings={
          "ng-reflect-ng-if": "true"
        }-->`,
        '',
        `<div _ngcontent-tst-c180="" class="badge bg-secondary text-wrap ng-star-inserted"> git </div><!--bindings={
          "ng-reflect-ng-for-of": "git"
        }--><!--ng-container--><!--bindings={
          "ng-reflect-ng-if": "true"
        }-->`,
      ];
      const dataFormat = [
        '<span matripple="" class="mat-ripple mat-checkbox-ripple mat-focus-indicator" ng-reflect-trigger="[object HTMLLabelElement]" ng-reflect-disabled="false" ng-reflect-radius="20" ng-reflect-centered="true" ng-reflect-animation="[object Object]">&nbsp;',
        '19',
        'user@ioet.com',
        '07/01/2022',
        '09:00',
        '09:00',
        '18:00',
        'Project_Name',
        '3',
        'Customer_Name',
        '3',
        'Activity_Name',
        ' https://ioetec.atlassian.net/browse/CB-115 ',
        '',
        ' git ',
      ];

      data.forEach((value: any, index) => {
        const formatValue = component.bodyExportOptions(value, row, index, node);
        expect(formatValue).toEqual(dataFormat[index]);
      });
    });

    it('Should render column header called Time Zone', () => {
      const table = document.querySelector('table#time-entries-table');
      const tableHeaderElements = Array.from(table.getElementsByTagName('th'));
      const tableHeaderTitles = tableHeaderElements.map((element) => element.textContent);
      expect(tableHeaderTitles).toContain('Time zone');
    });

    it('Should render a cell content with UTC text', () => {
      const TIME_ZONE_CELL_NUMBER = 7;
      const TABLE_ROW_NUMBER = 1;
      const table = document.querySelector('table#time-entries-table');
      const arrayTableRows = Array.from(table.getElementsByTagName('tr'));
      const tablerow = arrayTableRows[TABLE_ROW_NUMBER];
      const cells = Array.from(tablerow.getElementsByTagName('td'));
      const cell = cells[TIME_ZONE_CELL_NUMBER].textContent;
      expect(cell).toContain('UTC-5');
    });

    it('Should populate the projects with the payload from the action executed', () => {
      const actionSubject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const customerObj: Customer = { name: 'name' };
      const projectsArray: Project[] = [
        {
          id: 'projectId',
          customer_id: 'customer_id',
          customer: customerObj,
          name: 'name',
          description: 'proejectDescription',
          project_type_id: 'project_type_id',
          status: 'active',
        },
      ];
      const action = {
        type: ProjectActionTypes.LOAD_PROJECTS_SUCCESS,
        payload: projectsArray,
      };
      actionSubject.next(action);
      expect(component.projects).toEqual(projectsArray);
    });

    it('Should populate the activities with the payload from the action executed', () => {
      const Subject = TestBed.inject(ActionsSubject) as ActionsSubject;
      const activitiesArray: Activity[] = [
        {
          id: 'activityId',
          name: 'activityName',
          description: 'activityDescription',
          status: 'string'
        },
      ];
      const action = {
        type: ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS,
        payload: activitiesArray,
      };
      Subject.next(action);
      expect(component.activities).toEqual(activitiesArray);
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
