import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  currentDate: Date;
  hour: number;
  minutes: number;
  seconds: number;
  displayTime: boolean;

  constructor() {
    this.showClcok();
    this.displayTime = false;
    setTimeout(() => {
      this.displayTime = true;
    }, 3000);
   }

   showClcok() {
    const timer = interval(1000);
    timer.subscribe( (data) => {
      this.currentDate = new Date();
      this.hour = this.currentDate.getHours();
      this.minutes = this.currentDate.getMinutes();
      this.seconds = this.currentDate.getSeconds();
    } );
   }

  ngOnInit(): void {
  }

}
