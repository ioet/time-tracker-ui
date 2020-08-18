import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { Entry } from 'src/app/modules/shared/models';
import { DataSource } from 'src/app/modules/shared/models/data-source.model';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { getReportDataSource } from '../../../time-clock/store/entry.selectors';


@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss']
})
export class TimeEntriesTableComponent implements OnInit, OnDestroy, AfterViewInit {
  dtOptions: any = {
    paging: true,
    pageLength: 20,
    dom: 'Bfrtip',
    responsive: {
      details: {
        type: 'column',
        target: 'tr'
      }
    },
    columnDefs: [{
      className: 'control',
      targets: 0
    }],
    buttons: [
      {
        extend: 'colvis',
        columns: ':not(.hidden-col)',

      },
      {
        extend: 'excel',
        exportOptions: {
          format: {
            body: (data, row, column, node) => {
              return column === 3 ?
                moment.duration(data).asHours().toFixed(4).slice(0, -1) :
                data;
            }
          },
          columns: ':not(.expand-button-container)'
        },
        text: 'Excel',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`,
        columns: ':not(.expand-button-container)'
      },
      {
        extend: 'csv',
        exportOptions: {
          format: {
            body: (data, row, column, node) => {
              return column === 3 ?
                moment.duration(data).asHours().toFixed(4).slice(0, -1) :
                data;
            }
          },
          columns: ':not(.expand-button-container)'
        },
        text: 'CSV',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`,
        columns: ':not(.expand-button-container)'
      }
    ]
  };
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isLoading$: Observable<boolean>;
  reportDataSource$: Observable<DataSource<Entry>>;

  constructor(private store: Store<EntryState>) {
    this.reportDataSource$ = this.store.pipe(select(getReportDataSource));
  }

  ngOnInit(): void {
    this.reportDataSource$.subscribe((ds) => {
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
      console.log('TimeEntriesTableComponent -> rerenderDataTable -> this.dtElement', this.dtElement);
      console.log('TimeEntriesTableComponent -> rerenderDataTable -> this.dtElement.dtInstance', this.dtElement.dtInstance);

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();


        dtInstance.on('responsive-resize',  (e, datatable, columns) => {
          const count = columns.reduce( (a, b) => {
            return b === false ? a + 1 : a;
          }, 0);

          console.log(count + ' column(s) are hidden');
        });





      });
    } else {
      this.dtTrigger.next();
    }
  }
}
