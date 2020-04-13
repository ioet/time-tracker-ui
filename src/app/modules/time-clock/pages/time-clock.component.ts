import { LoadActivities } from '../../activities-management/store/activity-management.actions';
import { ActivityState } from '../../activities-management/store/activity-management.reducers';
import { Store, select } from '@ngrx/store';
import { allActivities } from '../../activities-management/store';
import { Activity } from 'src/app/modules/shared/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.scss'],
})
export class TimeClockComponent implements OnInit {
  currentDate: Date = new Date();
  username = 'Dario';
  isClockIn: boolean;
  isEnterTechnology: boolean;
  showAlertEnterTecnology: boolean;
  showFields: boolean;
  hourCounterRealTime: number;
  minuteCounterRealTime: number;
  secondsCounterRealTime: number;
  hour: number;
  minute: number;
  seconds: number;
  interval;
  dataTechnology: string[] = new Array();
  execOnlyOneTimeCounter = false;
  execOnlyOneTimeClockIn = false;
  isClockInEnable = false;
  isHidenForm = true;

  activities: Activity[] = [];

  constructor(private store: Store<ActivityState>) {
    this.isClockIn = true;
    this.isEnterTechnology = false;
    this.hourCounterRealTime = 0;
    this.minuteCounterRealTime = 0;
    this.secondsCounterRealTime = 0;
    this.hour = 0;
    this.minute = 0;
    this.seconds = 0;
  }

  ngOnInit() {
    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));
    activities$.subscribe((response) => {
      this.activities = response;
    });
  }

  employeClockIn(): boolean {
    this.isClockInEnable = true;
    this.isClockIn = !this.isClockIn;
    this.isHidenForm = false;
    this.startTimer();
    this.setArrivalAndDepartureTimes();
    return this.isClockIn;
  }

  employeClockOut() {
    if (this.isEnterTechnology === false) {
      this.isClockIn = false;
      this.showAlertEnterTecnology = true;
    } else {
      this.setDefaultValuesToFields();
      this.pauseTimer();
      this.setArrivalAndDepartureTimes();
    }
  }

  enterTechnology(data: string) {
    if (data.length > 0) {
      this.isEnterTechnology = true;
    } else {
      this.isEnterTechnology = false;
    }
  }

  setShowFields(show: boolean) {
    this.isHidenForm = false;
    if (this.isClockInEnable !== true) {
      this.isClockIn = false;
      this.showFields = show;
      if (!this.execOnlyOneTimeCounter) {
        this.startTimer();
        this.execOnlyOneTimeCounter = true;
      }
      this.setArrivalAndDepartureTimes();
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timer();
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  timer() {
    this.secondsCounterRealTime += 1;
    if (this.secondsCounterRealTime === 59) {
      this.minuteCounterRealTime += 1;
      this.secondsCounterRealTime = 0;
      if (this.minuteCounterRealTime === 59) {
        this.hourCounterRealTime += 1;
        this.minuteCounterRealTime = 0;
      }
    }
  }

  setArrivalAndDepartureTimes() {
    if (!this.execOnlyOneTimeClockIn) {
      this.currentDate = new Date();
      this.hour = this.currentDate.getHours();
      this.minute = this.currentDate.getMinutes();
      this.seconds = this.currentDate.getSeconds();
      this.execOnlyOneTimeClockIn = true;
    }
  }

  setDefaultValuesToFields() {
    this.isHidenForm = true;
    this.isClockIn = true;
    this.isEnterTechnology = false;
    this.showAlertEnterTecnology = false;
    this.execOnlyOneTimeClockIn = false;
    this.execOnlyOneTimeCounter = false;
    this.isClockInEnable = false;
  }

}
