import { formatDate } from '@angular/common';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {EntryState} from '../../../time-clock/store/entry.reducer';
import {entriesForReport, getIsLoadingReportData} from '../../../time-clock/store/entry.selectors';
import {Subject, Observable} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import * as moment from 'moment';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss']
})
export class TimeEntriesTableComponent implements OnInit, OnDestroy, AfterViewInit {
  data = [];

  dtOptions: any = {
    scrollY: '600px',
    paging: false,
    dom: 'Bfrtip',
    buttons: [
      'colvis',
      'print',
      {
        extend: 'excel',
        exportOptions:  {
          format: {
              body: ( data, row, column, node ) => {
                  return column === 3 ?
                      moment.duration(data).asHours().toFixed(4).slice(0, -1) :
                      data;
              }
          }},
        text: 'Excel',
        filename: `time-entries-${ formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en') }`
      },
      {
        extend: 'csv',
        exportOptions:  {
          format: {
              body: ( data, row, column, node ) => {
                  return column === 3 ?
                      moment.duration(data).asHours().toFixed(4).slice(0, -1) :
                      data;
              }
          }},
        text: 'CSV',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en') }`
      }
    ]
  };

  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<EntryState>) {
    this.isLoading$ = this.store.pipe(select(getIsLoadingReportData));
  }

  ngOnInit(): void {
    const dataForReport$ = this.store.pipe(select(entriesForReport));
    dataForReport$.subscribe((response) => {
      this.data = response;
      this.rerenderDataTable();
    });

  }

  ngAfterViewInit(): void {
    this.rerenderDataTable();
  }

  ngOnDestroy(): void {
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
}
