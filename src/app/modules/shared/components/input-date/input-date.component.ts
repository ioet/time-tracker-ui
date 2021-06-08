import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DATE_FORMAT_YEAR } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements ControlValueAccessor {
  value: string;
  isDisabled: boolean;
  onChange = (_: any) => { };
  onTouch = () => {  };

  constructor() {
  }

  onInput(value: moment.Moment) {
    this.value = value.format(DATE_FORMAT_YEAR);
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  openOrCloseDatePicker(datepicker: MatDatepicker<Date>): void {
    return datepicker.opened ? datepicker.close() : datepicker.open();
  }
  getCurrentDate(): string {
    return moment(new Date()).format(DATE_FORMAT_YEAR);
  }
}
