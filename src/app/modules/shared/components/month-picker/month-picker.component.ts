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
  selectedYear: number;
  selectedYearText: string;
  months: Array<string> = [];

  currentYear = new Date().getFullYear();

  constructor() {
    this.selectedYearMoment = moment();
    this.selectedMonthMoment = moment();
    this.months = moment.months();
    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedYearText = moment(this.selectedYearMoment).format('YYYY');
    this.selectedYear = this.selectedYearMoment.year();
  }

  ngOnInit() {
    this.selectDate(this.selectedMonthIndex, this.selectedYear);
  }

  changeYear(changeAction: string) {
    this.selectedYearMoment[changeAction](1, 'year');
    this.selectedYearText = moment(this.selectedYearMoment).format('YYYY');
    this.selectedYear = this.selectedYearMoment.year();

    const monthIndex = changeAction === 'add' ? 0 : 11;
    this.selectMonth(monthIndex);
  }

  selectMonth(monthIndex: number) {
    this.selectedMonthIndex = monthIndex;
    this.selectDate(this.selectedMonthIndex, this.selectedYear);
  }

  isSelectedMonth(monthIndex: number) {
    return (
      this.selectedMonthIndex === monthIndex &&
      this.selectedYear === this.selectedYearMoment.year()
    );
  }

  selectDate(monthIndex: number, year: number) {
    this.dateSelected.emit({ monthIndex, year });
  }
}
