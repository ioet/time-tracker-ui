import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css']
})
export class MonthPickerComponent implements OnInit {
  @Output() monthSelected = new EventEmitter();
  activeMonth: number;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor() { }

  ngOnInit(): void {
    this.activeMonth = new Date().getMonth();
  }

  getMonth(month: number) {
    this.monthSelected.emit(month);
    this.activeMonth = month;
  }
}
