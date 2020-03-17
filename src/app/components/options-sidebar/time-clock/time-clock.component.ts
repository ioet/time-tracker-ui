import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, timer } from 'rxjs';


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

  public timer;

  constructor() {
    this.isClockIn = true;
    this.isEnterTechnology = false;
    this.hour = 0;
    this.minute = 0;
    this.seconds = 0;
   }

   employeClockIn(): boolean {
     this.isClockIn = !this.isClockIn;
     this.enableTimer();
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
       console.log('Disble Timer');
     }
   }

   enterTechnology(data: string) {
     if ( data.length > 0 ) {
      this.isEnterTechnology = true;
     } else {
       this.isEnterTechnology = false;
     }
   }

   enableTimer() {
    this.timer = interval(1000);
    this.timer.subscribe( (data) => {
      this.seconds += 1;
      if ( this.seconds === 59 ) {
        this.minute += 1;
        this.seconds = 0;
        if ( this.minute === 59 ) {
          this.hour += 1;
          this.minute = 0;
        }
      }
      // console.log(this.hour + ' : ' + this.minute + ' : ' + this.seconds);
    });

   }


   ngOnInit(): void {
  }


}
