import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent {

  isClockIn: boolean;
  isEnterTechnology: boolean;
  showAlertEnterTecnology: boolean;

  constructor() {
    this.isClockIn = true;
    this.isEnterTechnology = false;
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
}
