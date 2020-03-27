import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  currentDate: Date = new Date();
  hour: number;
  minutes: number;
  seconds: number;
  displayTime: boolean;

  constructor() {
    this.showClock();
    this.displayTime = false;
    this.hour = 0;
    this.minutes = 0;
    this.seconds = 0;
    setTimeout(() => {
      this.displayTime = true;
    }, 3000);
   }

   showClock() {
    const timenInterval = interval(1000);
    timenInterval.subscribe( (data) => {
      this.currentDate = new Date();
      this.hour = this.currentDate.getHours();
      this.minutes = this.currentDate.getMinutes();
      this.seconds = this.currentDate.getSeconds();
    });
   }

  ngOnInit(): void {
  }

}
