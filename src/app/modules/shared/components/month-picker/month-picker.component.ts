import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {
  @Input() year: number;
  @Input() month: number;
  @Output() changeDate = new EventEmitter<{ monthIndex: number, year: number }>();

  model: MonthPickerModel;
  isShowYears: boolean;
  years: Array<number> = [];

  ngOnInit() {

    this.model = new MonthPickerModel();

    if (this.year) {
      this.model.selectedYearMoment = moment().year(this.year);
      this.model.updateYearText();
    }

    if (this.month) {
      this.model.selectedMonthIndex = this.month;
      this.model.selectedMonthMoment = moment().month(this.month);
      if (this.year) { this.model.selectedMonthYear = this.year; }
    }

    this.onChange(this.model.selectedMonthIndex, this.model.selectedMonthYear);
  }

  decrement() {
    this.model.decrementYear();
    if (this.isShowYears) {
      this.renderYears();
    }
  }

  increment() {
    this.model.incrementYear();
    if (this.isShowYears) {
      this.renderYears();
    }
  }

  selectMonth(index: number) {
    this.model.selectMonth(index);
    this.onChange(this.model.selectedMonthIndex, this.model.selectedMonthYear);
  }

  isSelectedMonth(monthIndex: number) {
    return this.model.selectedMonthIndex === monthIndex && this.model.selectedMonthYear === this.model.selectedYearMoment.year();
  }

  onChange(monthIndex: number, year: number) {
    // tslint:disable-next-line:no-unused-expression
    this.changeDate.emit({monthIndex, year});
  }

  // tslint:disable-next-line:no-unused-expression
  toggleShowYears() {
    this.isShowYears = !this.isShowYears;
    this.renderYears();
  }

  renderYears() {
    this.years = [];
    for (let i = 5; i > 0; i--) {
      this.years.push(this.model.selectedYearMoment.year() - i);
    }
    for (let i = 0; i <= 6; i++) {
      this.years.push(this.model.selectedYearMoment.year() + i);
    }
  }

  selectYear(year: number) {
    this.isShowYears = false;
    this.model.selectedYearMoment = moment().year(year);
    this.model.updateYearText(); // in set get aendern
  }

  isSelectedYear(year: number){
    return this.model.selectedYearMoment.year() === year;
  }
}

export class MonthPickerModel {
  constructor() {
    this.selectedYearMoment = moment();
    this.updateYearText();

    this.selectedMonthMoment = moment();

    this.months = moment.months();

    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedMonthYear = this.selectedYearMoment.year();
  }

  selectedYearMoment: moment.Moment;
  selectedYearText: string;

  selectedMonthMoment: moment.Moment;
  selectedMonthIndex: number;
  selectedMonthYear: number;

  months: Array<string> = [];

  updateYearText() {
    this.selectedYearText = moment(this.selectedYearMoment).format('YYYY');
  }

  selectMonth(index: number) {
    this.selectedMonthMoment = moment().month(index);
    this.selectedMonthIndex = this.selectedMonthMoment.month() + 1;
    this.selectedMonthYear = this.selectedYearMoment.year();
  }

  incrementYear() {
    this.selectedYearMoment = this.selectedYearMoment.add(1, 'year');
    this.updateYearText();
  }

  decrementYear() {
    this.selectedYearMoment = this.selectedYearMoment.subtract(1, 'year');
    this.updateYearText();
  }

}
