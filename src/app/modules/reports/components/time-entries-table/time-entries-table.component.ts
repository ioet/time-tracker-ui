import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {EntryState} from '../../../time-clock/store/entry.reducer';
import {entriesForReport} from '../../../time-clock/store/entry.selectors';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
})
export class TimeEntriesTableComponent implements OnInit, OnDestroy, AfterViewInit {

  data = [];
  const;
  dtOptions: any = {
    scrollY: '790px',
    paging: false,
    dom: 'Bfrtip',
    buttons: [
      'colvis',
      'print',
      'excel'
    ]
  };

  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private store: Store<EntryState>) {
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
    console.log('1', this.dtElement);
    console.log('1', this.dtElement);
    if (this.dtElement && this.dtElement.dtInstance) {
      console.log('2');
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        console.log('3');

        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      console.log('4');
      this.dtTrigger.next();
    }
  }
}
