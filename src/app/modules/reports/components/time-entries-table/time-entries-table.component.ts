import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Observable, Subject, Subscription } from 'rxjs';
import { Entry } from 'src/app/modules/shared/models';
import { DataSource } from 'src/app/modules/shared/models/data-source.model';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { getReportDataSource } from '../../../time-clock/store/entry.selectors';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss'],
})
export class TimeEntriesTableComponent implements OnInit, OnDestroy {
  dtOptions: any = {
    scrollY: '590px',
    dom: 'Bfrtip',
    buttons: [
      {
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
    ]
  };
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isLoading$: Observable<boolean>;
  reportDataSource$: Observable<DataSource<Entry>>;
  rerenderTableSubscription: Subscription;

  constructor(private store: Store<EntryState>) {
    this.reportDataSource$ = this.store.pipe(select(getReportDataSource));
  }

  ngOnInit(): void {
    this.rerenderTableSubscription = this.reportDataSource$.subscribe((ds) => {
      this.rerenderDataTable();
    });
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
    const durationColumnIndex = 3;
    return column === durationColumnIndex ? moment.duration(data).asHours().toFixed(2) : data;
  }
}
