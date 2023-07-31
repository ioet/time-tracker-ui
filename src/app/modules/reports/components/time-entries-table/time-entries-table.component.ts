import { formatDate } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, OnInit, ViewChild } from '@angular/core';
import { select, Store, ActionsSubject } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Activity, Entry, Project } from 'src/app/modules/shared/models';
import { DataSource } from 'src/app/modules/shared/models/data-source.model';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { getReportDataSource, getResultSumEntriesSelected } from '../../../time-clock/store/entry.selectors';
import { TotalHours } from '../../models/total-hours-report';
import { User } from 'src/app/modules/users/models/users';
import { LoadUsers, UserActionTypes } from 'src/app/modules/users/store/user.actions';
import { ParseDateTimeOffset } from '../../../shared/formatters/parse-date-time-offset/parse-date-time-offset';
import {
  LoadProjects,
  ProjectActionTypes,
} from 'src/app/modules/customer-management/components/projects/components/store/project.actions';
import { ActivityManagementActionTypes, LoadActivities } from 'src/app/modules/activities-management/store';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss'],
})
export class TimeEntriesTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() selectedUserId = new EventEmitter<string>();
  @Output() selectedProjectId = new EventEmitter<string>();
  @Output() selectedActivityId = new EventEmitter<string>();

  selectOptionValues = [15, 30, 50, 100, -1];
  selectOptionNames = [15, 30, 50, 100, 'All'];
  totalTimeSelected: moment.Duration;
  users: User[] = [];
  projects: Project[] = [];
  activities: Activity[] = [];
  removeFirstColumn = 'th:not(:first)';

  dtOptions: any = {
    scrollY: '590px',
    dom: '<"d-flex justify-content-between"B<"d-flex"<"mr-5"l>f>>rtip',
    pageLength: 30,
    lengthMenu: [this.selectOptionValues, this.selectOptionNames],
    buttons: [
      {
        text: 'Column Visibility' + ' ▼',
        extend: 'colvis',
        columns: ':not(.hidden-col)',
      },
      {
        extend: 'print',
        exportOptions: {
          columns: this.removeFirstColumn,
        },
      },
      {
        extend: 'excel',
        exportOptions: {
          format: {
            body: this.bodyExportOptions,
          },
          columns: this.removeFirstColumn,
        },
        text: 'Excel',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`,
      },
      {
        extend: 'csv',
        exportOptions: {
          format: {
            body: this.bodyExportOptions,
          },
          columns: this.removeFirstColumn,
        },
        text: 'CSV',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`,
      },
    ],
    columnDefs: [
      { type: 'date', targets: 3 },
      { orderable: false, targets: [0] },
    ],
    order: [
      [1, 'asc'],
      [2, 'desc'],
      [4, 'desc'],
    ],
  };
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isLoading$: Observable<boolean>;
  reportDataSource$: Observable<DataSource<Entry>>;
  rerenderTableSubscription: Subscription;
  resultSum: TotalHours;
  resultSumEntriesSelected: TotalHours;
  resultSumEntriesSelected$: Observable<TotalHours>;
  totalHoursSubscription: Subscription;
  dateTimeOffset: ParseDateTimeOffset;
  listProjects: Project[] = [];

  constructor(
    private store: Store<EntryState>,
    private actionsSubject$: ActionsSubject,
    private storeUser: Store<User>,
    private storeProject: Store<Project>,
    private storeActivity: Store<Activity>
  ) {
    this.reportDataSource$ = this.store.pipe(select(getReportDataSource));
    this.resultSumEntriesSelected$ = this.store.pipe(select(getResultSumEntriesSelected));
    this.dateTimeOffset = new ParseDateTimeOffset();
    this.resultSumEntriesSelected = new TotalHours();
  }

  uploadUsers(): void {
    this.storeUser.dispatch(new LoadUsers());
    this.actionsSubject$
      .pipe(filter((action: any) => action.type === UserActionTypes.LOAD_USERS_SUCCESS))
      .subscribe((action) => {
        const sortUsers = [...action.payload];
        sortUsers.sort((a, b) => a.name.localeCompare(b.name));
        this.users = sortUsers;
      });
  }

  uploadProjects(): void {
    this.storeProject.dispatch(new LoadProjects());
    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ProjectActionTypes.LOAD_PROJECTS_SUCCESS))
      .subscribe((action) => {
        const sortProjects = [...action.payload];
        sortProjects.sort((a, b) => a.name.localeCompare(b.name));
        this.projects = sortProjects;
        this.projects = this.projects.filter((project) => project.status === 'active');
        this.projects.sort((a, b) => {
          const x = a.customer.name.toLowerCase();
          const y = b.customer.name.toLowerCase();
          if (x > y) {
            return 1;
          }
          if (x < y) {
            return -1;
          }
          return 0;
        });
        this.projects.forEach((project) => {
          const projectWithSearchField = { ...project };
          projectWithSearchField.search_field = `${project.customer.name} - ${project.name}`;
          this.listProjects.push(projectWithSearchField);
        });
      });
  }

  uploadActivities(): void {
    this.storeActivity.dispatch(new LoadActivities());
    this.actionsSubject$
      .pipe(filter((action: any) => action.type === ActivityManagementActionTypes.LOAD_ACTIVITIES_SUCCESS))
      .subscribe((action) => {
        const sortActivities = [...action.payload];
        sortActivities.sort((a, b) => a.name.localeCompare(b.name));
        this.activities = sortActivities;
      });
  }

  ngOnInit(): void {
    this.rerenderTableSubscription = this.reportDataSource$.subscribe((ds) => {
      this.totalHoursSubscription = this.resultSumEntriesSelected$.subscribe((actTotalHours) => {
        this.resultSumEntriesSelected = actTotalHours;
        this.totalTimeSelected = moment.duration(0);
      });
      this.sumDates(ds.data);
      this.rerenderDataTable();
    });
    this.uploadUsers();
    this.uploadProjects();
    this.uploadActivities();
  }

  ngAfterViewInit(): void {
    this.rerenderDataTable();
  }

  ngOnDestroy(): void {
    this.rerenderTableSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  private rerenderDataTable(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }

  openURLInNewTab(uri: string): WindowProxy | string {
    return this.isURL(uri) ? window.open(uri, '_blank') : '';
  }

  isURL(uri: string): boolean {
    const regex = new RegExp('http*', 'g');
    return regex.test(uri);
  }

  bodyExportOptions(data, row, column, node) {
    return data.toString().replace(/<((.|\n){0,200}?)>/gi, '') || '';
  }

  sumDates(arrayData: Entry[]): TotalHours {
    this.resultSum = new TotalHours();
    const arrayDurations = new Array();
    arrayData.forEach((entry) => {
      const start = moment(entry.end_date).diff(moment(entry.start_date));
      arrayDurations.push(moment.utc(start).format('HH:mm:ss'));
    });

    const totalDurations = arrayDurations.slice(1).reduce((prev, cur) => {
      return prev.add(cur);
    }, moment.duration(arrayDurations[0]));
    const daysInHours = totalDurations.days() * 24;
    this.resultSum.hours = totalDurations.hours() + daysInHours;
    this.resultSum.minutes = totalDurations.minutes();
    this.resultSum.seconds = totalDurations.seconds();
    return this.resultSum;
  }

  user(userId: string) {
    this.selectedUserId.emit(userId);
  }

  project(projectId: string) {
    this.selectedProjectId.emit(projectId);
  }

  activity(activityId: string) {
    this.selectedActivityId.emit(activityId);
  }

  sumHoursEntriesSelected(entry: Entry, checked: boolean) {
    this.resultSumEntriesSelected = new TotalHours();
    const duration = moment.duration(moment(entry.end_date).diff(moment(entry.start_date)));
    this.totalTimeSelected = checked ? this.totalTimeSelected.add(duration) : this.totalTimeSelected.subtract(duration);
    const daysTotalInHours = this.totalTimeSelected.days() * 24;
    this.resultSumEntriesSelected.hours = this.totalTimeSelected.hours() + daysTotalInHours;
    this.resultSumEntriesSelected.minutes = this.totalTimeSelected.minutes();
    this.resultSumEntriesSelected.seconds = this.totalTimeSelected.seconds();
    return this.resultSumEntriesSelected;
  }
}
