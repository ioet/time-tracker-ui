import { getActiveTimeEntry } from './../store/entry.selectors';
import { StopTimeEntryRunning } from './../store/entry.actions';
import { Entry } from './../../shared/models/entry.model';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { Subscription } from 'rxjs';
import { EntryFieldsComponent } from '../components/entry-fields/entry-fields.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.scss'],
})
export class TimeClockComponent implements OnInit {
  @ViewChild(EntryFieldsComponent)
  entryFieldsComponent: EntryFieldsComponent;
  username: string;
  areFieldsVisible = false;
  activeTimeEntry: Entry;
  actionsSubscription: Subscription;

  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private store: Store<Entry>,
    private toastrService: ToastrService
  ) {}

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
