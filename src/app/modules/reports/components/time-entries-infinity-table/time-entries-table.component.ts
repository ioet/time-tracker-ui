import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { Entry } from 'src/app/modules/shared/models';
import { DataSource } from 'src/app/modules/shared/models/data-source.model';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { getReportDataSource } from '../../../time-clock/store/entry.selectors';


@Component({
  selector: 'app-time-entries-table2',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss']
})
export class TimeEntriesTable2Component implements OnInit, OnDestroy, AfterViewInit {

  dtOptions: any = {

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
      //  this.rerenderDataTable();
    });
  }

  ngAfterViewInit(): void {
    // this.rerenderDataTable();
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
