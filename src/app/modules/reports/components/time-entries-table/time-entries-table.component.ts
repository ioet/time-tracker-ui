import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Observable, Subject, Subscription } from 'rxjs';
import { Entry } from 'src/app/modules/shared/models';
import { DataSource } from 'src/app/modules/shared/models/data-source.model';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { getReportDataSource } from '../../../time-clock/store/entry.selectors';
import { Moment } from 'moment';
import { TotalHours } from '../../models/total-hours-report';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss'],
})
export class TimeEntriesTableComponent implements OnInit, OnDestroy, AfterViewInit {
  selectOptionValues = [15, 30, 50, 100, -1];
  selectOptionNames = [15, 30, 50, 100, 'All'];
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

  constructor(private store: Store<EntryState>) {
    this.reportDataSource$ = this.store.pipe(select(getReportDataSource));
  }

  ngOnInit(): void {
    this.rerenderTableSubscription = this.reportDataSource$.subscribe((ds) => {
      this.sumDates(ds.data);
      this.rerenderDataTable();
    });
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

  bodyExportOptions(data, row, column, node){
    const dataFormated = data.toString().replace(/<((.|\n){0,200}?)>/gi, '');
    const durationColumnIndex = 3;
    return column === durationColumnIndex ? moment.duration(dataFormated).asHours().toFixed(2) : dataFormated;
  }

  sumDates(arrayData: Entry[]): TotalHours{  
    this.resultSum = new TotalHours();
    arrayData.forEach(entry =>{
      let duration = this.getTimeDifference(moment(entry.end_date),moment(entry.start_date));
      this.resultSum.hours = Math.abs( this.resultSum.hours + duration.days() >= 1 ? duration.days() * 24 : 0);
      this.resultSum.hours = Math.abs(this.resultSum.hours + duration.hours());
      this.resultSum.minutes = Math.abs(this.resultSum.minutes + duration.minutes());
      this.resultSum.seconds = Math.abs(this.resultSum.seconds + duration.seconds());
    });
    return this.resultSum;
  }
  
  getTimeDifference(substractDate: moment.Moment, fromDate: moment.Moment): moment.Duration {
    return moment.duration(fromDate.diff(substractDate));
  }

}

