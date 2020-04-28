import { getStatusMessage } from './../../customer-management/store/customer-management.selectors';
import { getActiveTimeEntry } from './../store/entry.selectors';
import { StopTimeEntryRunning } from './../store/entry.actions';
import { Entry } from './../../shared/models/entry.model';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.scss'],
})
export class TimeClockComponent implements OnInit {

  username: string;
  areFieldsVisible = false;
  activeTimeEntry: Entry;
  message: string;

  constructor(private azureAdB2CService: AzureAdB2CService, private store: Store<Entry>) {
  }

  ngOnInit() {
    this.username = this.azureAdB2CService.isLogin() ? this.azureAdB2CService.getName() : '';
    this.store.pipe(select(getActiveTimeEntry)).subscribe((activeTimeEntry) => {
      this.activeTimeEntry = activeTimeEntry;
      if (this.activeTimeEntry) {
        this.areFieldsVisible = true;
      } else {
        this.areFieldsVisible = false;
      }
    });
    this.store.pipe(select(getStatusMessage)).subscribe((valueMessage) => {
      this.message = valueMessage;
    });
  }

  clockOut() {
    this.store.dispatch(new StopTimeEntryRunning(this.activeTimeEntry.id));
    this.areFieldsVisible = false;
  }

}
