import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EntryState } from 'src/app/modules/time-clock/store/entry.reducer';
import { DATE_FORMAT } from 'src/environments/environment';
import * as entryActions from '../../../time-clock/store/entry.actions';
import { TimeRangeHeaderComponent } from './time-range-header/time-range-header.component';


@Component({
  selector: 'app-time-range-custom',
  templateUrl: './time-range-custom.component.html',
  styleUrls: ['./time-range-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRangeCustomComponent implements OnInit, OnChanges {
  @Input() userId: string;
  customHeader = TimeRangeHeaderComponent;
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  constructor(private store: Store<EntryState>, private toastrService: ToastrService) {
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
    this.range.setValue({
      start: formatDate(moment().startOf('isoWeek').format('l'), DATE_FORMAT, 'en'),
      end: formatDate(moment().format('l'), DATE_FORMAT, 'en')
    });
    this.onSubmit();
  }

  onSubmit() {
    const startDate = moment(this.range.getRawValue().start).startOf('day');
    const endDate = moment(this.range.getRawValue().end).endOf('day');
    if (endDate.isBefore(startDate)) {
      this.toastrService.error('The end date should be after the start date');
    } else {
      this.store.dispatch(new entryActions.LoadEntriesByTimeRange({
        start_date: moment(this.range.getRawValue().start).startOf('day'),
        end_date: moment(this.range.getRawValue().end).endOf('day'),
      }, this.userId));
    }
  }

}
