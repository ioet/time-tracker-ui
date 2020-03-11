import { Component, OnInit } from '@angular/core';

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
    this.currentDate = new Date();
    this.hour = this.currentDate.getHours();
    this.minutes = this.currentDate.getMinutes();
    this.seconds = this.currentDate.getSeconds();
    this.displayTime = false;
    setTimeout(() => {
      this.displayTime = true;
    }, 3000);
   }

  ngOnInit(): void {
  }

}
