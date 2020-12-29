import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<{
    monthIndex: number;
    year: number;
  }>();

  selectedMonthMoment: moment.Moment;
  selectedMonthIndex: number;
  selectedYearMoment: moment.Moment;
  selectedMonthYear: number;

  selectedYearText: string;
  months: Array<string> = [];
  years: Array<number> = [];

  constructor() {
    this.selectedYearMoment = moment();
    this.selectedMonthMoment = moment();
    this.months = moment.months();
    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedMonthYear = this.selectedYearMoment.year();
    this.updateYearText();
  }

  ngOnInit() {
    this.selectDate(this.selectedMonthIndex, this.selectedMonthYear);
  }

  updateYearText() {
    this.selectedYearText = moment(this.selectedYearMoment).format('YYYY');
  }

  increment() {
    this.selectedYearMoment = this.selectedYearMoment.add(1, 'year');
    this.updateYearText();
  }

  decrement() {
    this.selectedYearMoment = this.selectedYearMoment.subtract(1, 'year');
    this.updateYearText();
  }

  selectMonth(index: number) {
    this.selectedMonthMoment = moment().month(index);
    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedMonthYear = this.selectedYearMoment.year();
    this.selectDate(this.selectedMonthIndex, this.selectedMonthYear);
  }

  isSelectedMonth(monthIndex: number) {
    return (
      this.selectedMonthIndex === monthIndex &&
      this.selectedMonthYear === this.selectedYearMoment.year()
    );
  }

  selectDate(monthIndex: number, year: number) {
    this.dateSelected.emit({ monthIndex: monthIndex, year: year });
  }

}

