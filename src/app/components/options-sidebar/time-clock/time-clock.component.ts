import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent  implements OnInit {
  projects = [
    { id: 'P1', name: 'Project 1' },
    { id: 'P2', name: 'Project 2' },
    { id: 'P3', name: 'Project 3' },
    { id: 'P4', name: 'Project 4' }
  ];

  showFields: boolean;

  username = 'Dario';
  clockInUsername = 'hh:mm:ss';
  clockOutUsername = 'hh:mm:ss';

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

   setShowFields(show: boolean) {
    this.isClockIn = false;
    this.showFields = show;
  }

  ngOnInit(): void {}
}
