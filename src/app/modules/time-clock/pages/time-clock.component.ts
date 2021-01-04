import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { EntryFieldsComponent } from '../components/entry-fields/entry-fields.component';
import { Entry } from './../../shared/models/entry.model';
import { EntryActionTypes, LoadEntriesSummary, StopTimeEntryRunning } from './../store/entry.actions';
import { getActiveTimeEntry, getIsLoading } from './../store/entry.selectors';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.scss'],
})
export class TimeClockComponent implements OnInit, OnDestroy {
  @ViewChild(EntryFieldsComponent)
  entryFieldsComponent: EntryFieldsComponent;
  username: string;
  areFieldsVisible = false;
  activeTimeEntry: Entry;
  clockOutSubscription: Subscription;


  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private store: Store<Entry>,
    private toastrService: ToastrService,
    private actionsSubject$: ActionsSubject,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnDestroy(): void {
    this.clockOutSubscription.unsubscribe();
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

    this.store.pipe(select(getIsLoading)).subscribe((isLoading) => {
      if (isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });

    this.reloadSummariesOnClockOut();

  }

  reloadSummariesOnClockOut() {
    this.clockOutSubscription = this.actionsSubject$.pipe(
      filter((action) => (
          action.type === EntryActionTypes.STOP_TIME_ENTRY_RUNNING_SUCCESS
        )
      )
    ).subscribe( (action) => {
      this.store.dispatch(new LoadEntriesSummary());
    });
  }

  stopEntry() {
    this.store.dispatch(new StopTimeEntryRunning(this.activeTimeEntry.id));
    this.areFieldsVisible = false;
  }

  clockOut() {
    if (this.entryFieldsComponent.entryFormIsValidate()) {
      this.stopEntry();
    } else {
      this.entryFieldsComponent.entryForm.get('activity_id').markAsTouched();
      this.toastrService.error('Activity is required');
    }
  }
}
