import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

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

  onInput(value: string) {
    this.value = value;
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
}
