import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { EntryService } from '../services/entry.service';
import { Store, select } from '@ngrx/store';
import { Entry } from '../../shared/models';
import { LoadTimeEntriesRunning, StopTimeEntriesRunning } from '../store/entry.actions';
import { getIdEntryRunning, getStatusMessage } from '../store/entry.selectors';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.scss'],
})
export class TimeClockComponent implements OnInit {
  idEntry: string;
  message: string;
  isClockIn = false;
  showFields = false;
  technologiesSelected = 0;
  needSelectTechnology = false;

  currentDate: Date = new Date();
  username: string;

  showAlertEnterTecnology: boolean;

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

  constructor(private azureAdB2CService: AzureAdB2CService, private store: Store<Entry>) {
    this.isClockIn = true;
    this.hourCounterRealTime = 0;
    this.minuteCounterRealTime = 0;
    this.secondsCounterRealTime = 0;
    this.hour = 0;
    this.minute = 0;
    this.seconds = 0;
  }

  ngOnInit() {
    this.username = this.azureAdB2CService.isLogin() ? this.azureAdB2CService.getName() : '';

    this.store.pipe(select(getIdEntryRunning)).subscribe((idEntryRunning) => {
      this.idEntry = idEntryRunning;
    });

    this.store.pipe(select(getStatusMessage)).subscribe((valueMessage) => {
      this.message = valueMessage;
      if (this.message !== '') {
        this.store.dispatch(new LoadTimeEntriesRunning());
        this.isClockIn = false;
        this.showFields = true;
      }
    });
  }

  employeClockIn() {
    this.store.dispatch(new LoadTimeEntriesRunning());
    this.isClockIn = true;
  }

  employeClockOut() {
    if (this.technologiesSelected > 0) {
      this.store.dispatch(new StopTimeEntriesRunning(this.idEntry));
      this.isClockIn = false;
      this.needSelectTechnology = false;
    } else {
      this.needSelectTechnology = true;
    }
  }

  enterTechnology(data: string) {}

  setShowFields(show: boolean) {}

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
    this.showAlertEnterTecnology = false;
    this.execOnlyOneTimeClockIn = false;
    this.execOnlyOneTimeCounter = false;
    this.isClockInEnable = false;
  }
}
