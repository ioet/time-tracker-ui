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

  username = 'Dario';
  clockInUsername = 'hh:mm:ss';
  clockOutUsername = 'hh:mm:ss';
  isClockIn: boolean;
  isEnterTechnology: boolean;
  showAlertEnterTecnology: boolean;
  showFields: boolean;
  hour: number;
  minute: number;
  seconds: number;
  interval;

  constructor() {
    this.isClockIn = true;
    this.isEnterTechnology = false;
    this.hour = 0;
    this.minute = 0;
    this.seconds = 0;
   }

   employeClockIn(): boolean {
     this.isClockIn = !this.isClockIn;
     this.startTimer();
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
       this.pauseTimer();
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

  startTimer() {
    this.interval = setInterval(() => {
      this.timer();
    }, 1000 );
   }

   pauseTimer() {
    clearInterval(this.interval);
   }

   timer() {
    this.seconds += 1;
    if ( this.seconds === 59 ) {
      this.minute += 1;
      this.seconds = 0;
      if ( this.minute === 59 ) {
        this.hour += 1;
        this.minute = 0;
      }
    }
  }

  ngOnInit(): void {}

}
