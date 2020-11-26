import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { FeatureManagerService } from 'src/app/modules/shared/feature-toggles/feature-toggle-manager.service';
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
    scrollY: '600px',
    paging: false,
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'colvis',
        columns: ':not(.hidden-col)',

      },
      'print',
      {
        extend: 'excel',
        exportOptions: {
          format: {
            body: (data, row, column, node) => {
              return column === 3 ?
                moment.duration(data).asHours().toFixed(4).slice(0, -1) :
                data;
            }
          }
        },
        text: 'Excel',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`
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
          }
        },
        text: 'CSV',
        filename: `time-entries-${formatDate(new Date(), 'MM_dd_yyyy-HH_mm', 'en')}`
      }
    ]
  };
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isLoading$: Observable<boolean>;
  reportDataSource$: Observable<DataSource<Entry>>;
  showVersionNumber$: Observable<boolean>;

  constructor(private store: Store<EntryState>, private featureManagerService: FeatureManagerService) {
    this.reportDataSource$ = this.store.pipe(select(getReportDataSource));
    this.showVersionNumber$ = this.featureManagerService.isToggleEnabledForUser('new-reports-layout', 'dev');

  }

  ngOnInit(): void {
    this.reportDataSource$.subscribe((ds) => {
      this.rerenderDataTable();
    });
    this.showVersionNumber$.subscribe(featureToggle => console.log('El valor del toggle es:', featureToggle));
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
