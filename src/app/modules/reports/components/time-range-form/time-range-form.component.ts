import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as entryActions from '../../../time-clock/store/entry.actions';
import {Store} from '@ngrx/store';
import {EntryState} from '../../../time-clock/store/entry.reducer';
import * as moment from 'moment';

@Component({
  selector: 'app-time-range-form',
  templateUrl: './time-range-form.component.html',
})
export class TimeRangeFormComponent implements OnInit {
  public reportForm: FormGroup;
  private startDate = new FormControl('');
  private endDate = new FormControl('');

  constructor(private store: Store<EntryState>) {
    this.reportForm = new FormGroup({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
  ngOnInit(): void {
    this.setInitialDataOnScreen();
  }

  setInitialDataOnScreen() {
    this.reportForm.setValue({
      startDate: formatDate(moment().startOf('week').toString(), 'yyyy-MM-dd', 'en'),
      endDate: formatDate(moment().endOf('week').toString(), 'yyyy-MM-dd', 'en')
    });
    this.onSubmit();
  }

  onSubmit() {
    this.store.dispatch(new entryActions.LoadEntriesByTimeRange({
      start_date: moment(this.startDate.value).startOf('day'),
      end_date: moment(this.endDate.value).endOf('day'),
    }));
  }
}
