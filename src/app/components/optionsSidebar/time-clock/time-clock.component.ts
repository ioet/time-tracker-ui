import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent implements OnInit {

  isClockIn: boolean;

  constructor() {
    this.isClockIn = false;
   }

   employeClockIn(): boolean {
     this.isClockIn = true;
     console.log('valor es' + this.isClockIn);
     return this.isClockIn;
   }

  ngOnInit(): void {
  }

}
