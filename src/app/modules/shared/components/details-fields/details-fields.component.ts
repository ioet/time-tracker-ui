import { EntryActionTypes } from './../../../time-clock/store/entry.actions';
import { filter } from 'rxjs/operators';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { formatDate } from '@angular/common';

import { Activity, Entry, Project } from '../../models';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { TechnologyState } from '../../store/technology.reducers';
import { ActivityState, allActivities, LoadActivities } from '../../../activities-management/store';
import { getProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import * as projectActions from '../../../customer-management/components/projects/components/store/project.actions';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import * as entryActions from '../../../time-clock/store/entry.actions';
import { getCreateError, getUpdateError } from 'src/app/modules/time-clock/store/entry.selectors';
import { SaveEntryEvent } from './save-entry-event';
import { ToastrService } from 'ngx-toastr';

type Merged = TechnologyState & ProjectState & ActivityState & EntryState;

@Component({
  selector: 'app-details-fields',
  templateUrl: './details-fields.component.html',
  styleUrls: ['./details-fields.component.scss'],
})
export class DetailsFieldsComponent implements OnChanges, OnInit {
  @Input() entryToEdit: Entry;
  @Input() canMarkEntryAsWIP: boolean;
  @Output() saveEntry = new EventEmitter<SaveEntryEvent>();
  @ViewChild('closeModal') closeModal: ElementRef;
  entryForm: FormGroup;
  selectedTechnologies: string[] = [];
  isLoading = false;
  listProjects: Project[] = [];
  activities: Activity[] = [];
  goingToWorkOnThis = false;
  shouldRestartEntry = false;

  constructor(private formBuilder: FormBuilder, private store: Store<Merged>,
              private actionsSubject$: ActionsSubject, private toastrService: ToastrService) {
    this.entryForm = this.formBuilder.group({
      project_id: ['', Validators.required],
      activity_id: ['', Validators.required],
      description: '',
      entry_date: '',
      start_hour: '',
      end_hour: '',
      uri: '',
      technology: '',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new projectActions.LoadProjects());
    const projects$ = this.store.pipe(select(getProjects));
    projects$.subscribe((response) => {
      this.listProjects = response;
    });

    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));
    activities$.subscribe((response) => {
      this.activities = response;
    });

    const updateError$ = this.store.pipe(select(getUpdateError));
    updateError$.subscribe((updateError) => {
      if (updateError != null && !updateError) {
        this.store.dispatch(new entryActions.CleanEntryUpdateError(null));
        this.closeEntryModal();
      }
    });
    const createError$ = this.store.pipe(select(getCreateError));
    createError$.subscribe((createError) => {
      if (createError != null && !createError) {
        this.store.dispatch(new entryActions.CleanEntryCreateError(null));
        this.closeEntryModal();
      }
    });

    this.actionsSubject$.pipe(
      filter((action: any) => (
        action.type === EntryActionTypes.CREATE_ENTRY_SUCCESS ||
        action.type === EntryActionTypes.UPDATE_ENTRY_SUCCESS
      ))
    ).subscribe(() => {
      this.cleanForm();
    });
  }

  ngOnChanges(): void {
    this.goingToWorkOnThis = this.entryToEdit ? this.entryToEdit.running : false;
    if (this.entryToEdit) {
      this.selectedTechnologies = this.entryToEdit.technologies;
      this.entryForm.setValue({
        project_id: this.entryToEdit.project_id,
        activity_id: this.entryToEdit.activity_id,
        description: this.entryToEdit.description,
        entry_date: this.entryToEdit.start_date ? formatDate(this.entryToEdit.start_date, 'yyyy-MM-dd', 'en') : '',
        start_hour: this.entryToEdit.start_date ? formatDate(this.entryToEdit.start_date, 'HH:mm:ss', 'en') : '00:00:00',
        end_hour: this.entryToEdit.end_date ? formatDate(this.entryToEdit.end_date, 'HH:mm:ss', 'en') : '00:00:00',
        uri: this.entryToEdit.uri,
        technology: '',
      });
    } else {
      this.cleanForm();
    }
  }

  cleanForm() {
    this.selectedTechnologies = [];
    this.entryForm.setValue({
      project_id: '',
      activity_id: '',
      description: '',
      entry_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      start_hour: '00:00:00',
      end_hour: '00:00:00',
      uri: '',
      technology: '',
    });
  }

  onTechnologiesUpdated($event: string[]) {
    this.selectedTechnologies = $event;
  }

  get project_id() {
    return this.entryForm.get('project_id');
  }

  get activity_id() {
    return this.entryForm.get('activity_id');
  }

  get entry_date() {
    return this.entryForm.get('entry_date');
  }

  get start_hour() {
    return this.entryForm.get('start_hour');
  }

  get end_hour() {
    return this.entryForm.get('end_hour');
  }

  /* istanbul ignore next */
  closeEntryModal() {
    this.closeModal?.nativeElement?.click();
  }

  onSubmit() {
    if (this.entryForm.invalid) {
      return;
    }
    // start&end date same for now
    const entryDate = this.entryForm.value.entry_date;
    const entry = {
      project_id: this.entryForm.value.project_id,
      activity_id: this.entryForm.value.activity_id,
      technologies: this.selectedTechnologies ? this.selectedTechnologies : [],
      description: this.entryForm.value.description,
      start_date: new Date(`${entryDate}T${this.entryForm.value.start_hour.trim()}`).toISOString(),
      end_date: new Date(`${entryDate}T${this.entryForm.value.end_hour.trim()}`).toISOString(),
      uri: this.entryForm.value.uri,
      timezone_offset: new Date().getTimezoneOffset(),
    };
    if (this.goingToWorkOnThis) {
      delete entry.end_date;
    }

    const isEntryDateInTheFuture = new Date(entryDate) > new Date();
    if (isEntryDateInTheFuture) {
      this.toastrService.error('You cannot start a time-entry in the future');
      return;
    }

    this.saveEntry.emit({ entry, shouldRestartEntry: this.shouldRestartEntry });
  }

  onGoingToWorkOnThisChange(event: any) {
    this.goingToWorkOnThis = event.currentTarget.checked;
    if (!this.goingToWorkOnThis) {
      this.entryForm.patchValue({ end_hour: formatDate(new Date(), 'HH:mm:ss', 'en') });
    }
    this.shouldRestartEntry = !this.entryToEdit?.running && this.goingToWorkOnThis;
  }
}
