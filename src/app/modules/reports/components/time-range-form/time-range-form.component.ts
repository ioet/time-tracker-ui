import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { OnChanges, SimpleChanges, Component, Input, OnInit  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DATE_FORMAT } from 'src/environments/environment';
import * as entryActions from '../../../time-clock/store/entry.actions';
import {Store} from '@ngrx/store';
import {EntryState} from '../../../time-clock/store/entry.reducer';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-time-range-form',
  templateUrl: './time-range-form.component.html',
})
export class TimeRangeFormComponent implements OnInit, OnChanges {

  @Input() userId: string;

  public reportForm: FormGroup;
  private startDate = new FormControl('');
  private endDate = new FormControl('');

  constructor(private store: Store<EntryState>, private toastrService: ToastrService, private date: DateAdapter<Date>) {
    this.reportForm = new FormGroup({
      startDate: this.startDate,
      endDate: this.endDate
    });
    date.getFirstDayOfWeek = () => 1;
  
  }
  ngOnInit(): void {
    this.setInitialDataOnScreen();
  }

  ngOnChanges(changes: SimpleChanges){
    if (!changes.userId.firstChange){
      this.onSubmit();
    }
  }

  setInitialDataOnScreen() {
    this.reportForm.setValue({
      startDate: formatDate(moment().startOf('isoWeek').format('l'), DATE_FORMAT, 'en'),
      endDate: formatDate(moment().format('l'), DATE_FORMAT, 'en')
    });
    this.onSubmit();
  }
  onSubmit() {
    const endDate = moment(this.endDate.value).endOf('day');
    const startDate = moment(this.startDate.value).startOf('day');
    if (endDate.isBefore(startDate)) {
      this.toastrService.error('The end date should be after the start date');
    } else {
      this.store.dispatch(new entryActions.LoadEntriesByTimeRange({
        start_date: moment(this.startDate.value).startOf('day'),
        end_date: moment(this.endDate.value).endOf('day'),
      }, this.userId));
    }
  }
}
