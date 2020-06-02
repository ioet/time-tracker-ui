import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import * as entryActions from '../../../time-clock/store/entry.actions';
import {Store} from '@ngrx/store';
import {EntryState} from '../../../time-clock/store/entry.reducer';

@Component({
  selector: 'app-time-range-form',
  templateUrl: './time-range-form.component.html',
})
export class TimeRangeFormComponent {
  public reportForm: FormGroup;
  private startDate = new FormControl('');
  private endDate = new FormControl('');

  constructor(private store: Store<EntryState>) {
    this.reportForm = new FormGroup({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  onSubmit() {
    this.store.dispatch(new entryActions.LoadEntriesByTimeRange({
      start_date: this.startDate.value,
      end_date: this.endDate.value,
      user_id: '*',
    }));
  }
}
