import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent implements OnInit {

  username = 'Dario';
  clockInUsername = 'hh:mm:ss';
  clockOutUsername = 'hh:mm:ss';
  isClockIn: boolean;
  isEnterTechnology: boolean;
  showAlertEnterTecnology: boolean;
  hour: number;
  minute: number;
  seconds: number;

  constructor() {
    this.isClockIn = true;
    this.isEnterTechnology = false;
    this.hour = 0;
    this.minute = 0;
    this.seconds = 0;
   }

   employeClockIn(): boolean {
     this.isClockIn = !this.isClockIn;
     return this.isClockIn;
   }

   employeClockOut() {
     if ( this.isEnterTechnology === false ) {
       this.isClockIn = false;
       this.showAlertEnterTecnology = true;
     } else {
       this.isClockIn = true;
       this.isEnterTechnology = false;
       this.showAlertEnterTecnology = false;
     }
   }

   enterTechnology(data: string) {
     if ( data.length > 0 ) {
      this.isEnterTechnology = true;
     } else {
       this.isEnterTechnology = false;
     }
   }

   ngOnInit(): void {
  }

}
