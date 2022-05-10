import { formatDate } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, OnInit, ViewChild } from '@angular/core';
import { select, Store, ActionsSubject } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Entry } from 'src/app/modules/shared/models';
import { DataSource } from 'src/app/modules/shared/models/data-source.model';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { getReportDataSource } from '../../../time-clock/store/entry.selectors';
import { TotalHours } from '../../models/total-hours-report';
import { User } from 'src/app/modules/users/models/users';
import { LoadUsers, UserActionTypes } from 'src/app/modules/users/store/user.actions';
import { ParseDateTimeOffset } from '../../../shared/formatters/parse-date-time-offset/parse-date-time-offset';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss'],
})
export class TimeEntriesTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() selectedUserId = new EventEmitter<string>();

  selectOptionValues = [15, 30, 50, 100, -1];
  selectOptionNames = [15, 30, 50, 100, 'All'];
  users: User[] = [];
  dtOptions: any = {
    scrollY: '590px',
    dom: '<"d-flex justify-content-between"B<"d-flex"<"mr-5"l>f>>rtip',
    pageLength: 30,
    lengthMenu: [this.selectOptionValues, this.selectOptionNames],
    buttons: [
      {
        text: 'Column Visibility' + ' ▼',
        extend: 'colvis',
        columns: ':not(.hidden-col)'
      },
      {
        extend: 'print'
      },
      {
        extend: 'excel',
        exportOptions: {
          format: {
            body: this.bodyExportOptions
          }
        },
        text: 'Excel',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`
      },
      {
        extend: 'csv',
        exportOptions: {
          format: {
            body: this.bodyExportOptions
          }
        },
        text: 'CSV',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`
      },
    ],
    columnDefs: [{ type: 'date', targets: 2 }]
  };
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isLoading$: Observable<boolean>;
  reportDataSource$: Observable<DataSource<Entry>>;
  rerenderTableSubscription: Subscription;
  resultSum: TotalHours;
  dateTimeOffset: ParseDateTimeOffset;

  constructor(private store: Store<EntryState>, private actionsSubject$: ActionsSubject, private storeUser: Store<User> ) {
    this.reportDataSource$ = this.store.pipe(select(getReportDataSource));
    this.dateTimeOffset = new ParseDateTimeOffset();
  }

  uploadUsers(): void {
    this.storeUser.dispatch(new LoadUsers());
    this.actionsSubject$
      .pipe(filter((action: any) => action.type === UserActionTypes.LOAD_USERS_SUCCESS))
      .subscribe((action) => {
        this.users = action.payload;
      });
  }

  ngOnInit(): void {
    this.rerenderTableSubscription = this.reportDataSource$.subscribe((ds) => {
      this.sumDates(ds.data);
      this.rerenderDataTable();
    });
    this.uploadUsers();
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
    const dataFormated = data.toString().replace(/<((.|\n){0,200}?)>/gi, '');
    const durationColumnIndex = 3;
    return column === durationColumnIndex ? moment.duration(dataFormated).asHours().toFixed(2) : dataFormated;
  }

  sumDates(arrayData: Entry[]): TotalHours{
    this.resultSum = new TotalHours();
    const arrayDurations = new Array();
    arrayData.forEach(entry => {
      const start = moment(entry.end_date).diff(moment(entry.start_date));
      arrayDurations.push(moment.utc(start).format('HH:mm:ss'));
    });

    const totalDurations = arrayDurations.slice(1)
    .reduce((prev, cur) => {
      return prev.add(cur);
    },
    moment.duration(arrayDurations[0]));
    const daysInHours = totalDurations.days() * 24;
    this.resultSum.hours = totalDurations.hours() + daysInHours;
    this.resultSum.minutes = totalDurations.minutes();
    this.resultSum.seconds = totalDurations.seconds();
    return this.resultSum;
  }

  user(userId: string){
    this.selectedUserId.emit(userId);
  }

}

