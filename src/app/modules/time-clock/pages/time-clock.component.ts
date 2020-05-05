import {getStatusMessage} from './../../time-clock/store/entry.selectors';
import {getActiveTimeEntry} from './../store/entry.selectors';
import {EntryActionTypes, StopTimeEntryRunning} from './../store/entry.actions';
import {Entry} from './../../shared/models/entry.model';
import {Store, select, ActionsSubject} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {AzureAdB2CService} from '../../login/services/azure.ad.b2c.service';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.scss'],
})
export class TimeClockComponent implements OnInit {
  username: string;
  areFieldsVisible = false;
  activeTimeEntry: Entry;
  message: Observable<string>;
  showNotification = false;
  isError = false;
  actionsSubscription: Subscription;

  constructor(private azureAdB2CService: AzureAdB2CService, private store: Store<Entry>, private actionsSubject$: ActionsSubject) {
  }

  ngOnInit() {
    this.message = this.store.pipe(select(getStatusMessage));
    this.username = this.azureAdB2CService.isLogin() ? this.azureAdB2CService.getName() : '';
    this.store.pipe(select(getActiveTimeEntry)).subscribe((activeTimeEntry) => {
      this.activeTimeEntry = activeTimeEntry;
      if (this.activeTimeEntry) {
        this.areFieldsVisible = true;
      } else {
        this.areFieldsVisible = false;
      }
    });

    this.actionsSubscription = this.actionsSubject$.pipe(
      filter((action: any) => (action.type === EntryActionTypes.CREATE_ENTRY_SUCCESS) ||
        action.type === EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS)
    ).subscribe((action) => {
      this.displayNotification();
    });
  }

  clockOut() {
    this.store.dispatch(new StopTimeEntryRunning(this.activeTimeEntry.id));
    this.areFieldsVisible = false;
  }

  displayNotification() {
    this.showNotification = true;
    setTimeout(() => ((this.showNotification = false), (this.isError = false)), 3000);
  }
}
