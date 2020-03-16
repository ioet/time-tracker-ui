import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent {

  isClockIn: boolean;

  constructor() {
    this.isClockIn = true;
   }

   employeClockIn(): boolean {
     this.isClockIn = !this.isClockIn;
     console.log('valor es' + this.isClockIn);
     return this.isClockIn;
   }
}
