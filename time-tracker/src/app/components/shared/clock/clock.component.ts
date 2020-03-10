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

  constructor() {
    this.currentDate = new Date();
    this.hour = this.currentDate.getHours();
    this.minutes = this.currentDate.getMinutes();
    this.seconds = this.currentDate.getSeconds();
   }


  ngOnInit(): void {
  }

}
