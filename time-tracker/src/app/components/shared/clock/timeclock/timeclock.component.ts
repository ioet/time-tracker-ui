import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeclock',
  templateUrl: './timeclock.component.html',
  styleUrls: ['./timeclock.component.css']
})
export class TimeclockComponent {

  currentState: Date;
  hour: number;
  minutes: number;
  seconds: number;

  constructor() {
    this.currentState = new Date();
    this.hour = this.currentState.getHours();
    this.minutes = this.currentState.getMinutes();
    this.seconds = this.currentState.getSeconds();

    console.log(this.hour, this.minutes, this.seconds);
    console.log(this.currentState);
   }

}
