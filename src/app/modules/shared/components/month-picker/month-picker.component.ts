import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { FeatureToggle } from 'src/environments/enum';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {
  @Input()
  set selectedDate(selectedDateMoment: moment.Moment){
    this.refreshDate(selectedDateMoment);
  }
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
  showArrowNext = false;
  monthCurrent = moment().month();
  selectedDateMoment: moment.Moment = moment();
  isFeatureToggleCalendarActive: boolean;
  constructor(private cookiesService: CookieService) {
    this.selectedYearMoment = moment();
    this.selectedMonthMoment = moment();
    this.months = moment.months();
    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedYearText = moment(this.selectedYearMoment).format('YYYY');
    this.selectedYear = this.selectedYearMoment.year();
  }

  ngOnInit() {
    this.isFeatureToggleCalendarActive = (this.cookiesService.get(FeatureToggle.TIME_TRACKER_CALENDAR) === 'true');
    this.selectDate(this.selectedMonthIndex, this.selectedYear);
  }

  refreshDate(newDate: moment.Moment){
    if (this.isFeatureToggleCalendarActive){
      this.selectedDateMoment = newDate;
      this.selectedMonthIndex = this.selectedDateMoment.month();
      this.selectedYearText = moment(this.selectedDateMoment).format('YYYY');
      this.selectedYear = this.selectedDateMoment.year();
      this.showArrowNext = this.selectedYear < this.currentYear;
    }
  }

  changeYear(changeAction: string) {
    this.selectedYearMoment[changeAction](1, 'year');
    this.selectedYearText = moment(this.selectedYearMoment).format('YYYY');
    this.selectedYear = this.selectedYearMoment.year();

    const monthIndex = changeAction === 'add' ? 0 : 11;
    this.selectMonth(monthIndex);

    this.showArrowNext = this.selectedYear < this.currentYear;
  }

  selectMonth(monthIndex: number) {
    this.selectedMonthIndex = monthIndex;
    this.selectDate(this.selectedMonthIndex, this.selectedYear);
  }
  monthEnable(monthIndex: number){
    return(
      this.monthCurrent < monthIndex &&
      this.selectedYear === this.currentYear
    );
  }
  isSelectedMonth(monthIndex: number) {
    if (this.isFeatureToggleCalendarActive) {
      return (
        this.selectedMonthIndex === monthIndex &&
        this.selectedYear === this.selectedDateMoment.year()
      );
    }
    return (
      this.selectedMonthIndex === monthIndex &&
      this.selectedYear === this.selectedYearMoment.year()
    );
  }

  selectDate(monthIndex: number, year: number) {
    this.dateSelected.emit({ monthIndex, year });
  }
}
