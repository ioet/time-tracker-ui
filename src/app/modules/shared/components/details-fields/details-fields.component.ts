import { formatDate } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, map, mergeMap } from 'rxjs/operators';
import { getCreateError, getUpdateError } from 'src/app/modules/time-clock/store/entry.selectors';
import {
  ActivityState,
  allActiveActivities,
  allActivities,
  LoadActivities,
} from '../../../activities-management/store';
import * as projectActions from '../../../customer-management/components/projects/components/store/project.actions';
import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { getProjects, getRecentProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import * as entryActions from '../../../time-clock/store/entry.actions';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import { Activity, Entry, Project } from '../../models';
import { TechnologyState } from '../../store/technology.reducers';
import { EntryActionTypes } from './../../../time-clock/store/entry.actions';
import { SaveEntryEvent } from './save-entry-event';
import { ProjectSelectedEvent } from './project-selected-event';
import { get } from 'lodash';
import { DATE_FORMAT, DATE_FORMAT_YEAR } from 'src/environments/environment';
import { TechnologiesComponent } from '../technologies/technologies.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { Observable } from 'rxjs';

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
  @Output() projectSelected = new EventEmitter<ProjectSelectedEvent>();
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('technologies', { static: true }) technologies: TechnologiesComponent;
  entryForm: FormGroup;
  selectedTechnologies: string[] = [];
  isLoading = false;
  listProjects: Project[] = [];
  listRecentProjects: Project[] = [];
  listProjectsShowed: Project[] = [];
  activities$: Observable<Activity[]>;
  goingToWorkOnThis = false;
  shouldRestartEntry = false;
  isTechnologiesDisabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<Merged>,
    private actionsSubject$: ActionsSubject,
    private toastrService: ToastrService
  ) {
    this.entryForm = this.formBuilder.group({
      project_id: ['', Validators.required],
      project_name: ['', Validators.required],
      activity_id: ['', Validators.required],
      description: '',
      start_date: '',
      end_date: '',
      start_hour: '',
      end_hour: '',
      uri: '',
      technology: '',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new projectActions.LoadProjects());
    const projects$ = this.store.pipe(select(getProjects));
    projects$.subscribe((projects) => {
      if (projects) {
        this.listProjects = [];
        projects.forEach((project) => {
          const projectWithSearchField = { ...project };
          projectWithSearchField.search_field = `${project.customer.name} - ${project.name}`;
          this.listProjects.push(projectWithSearchField);
        });
      }
    });

    this.getRecentProjects();
    this.store.dispatch(new LoadActivities());
    this.activities$ = this.selectActiveActivities();

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

    this.actionsSubject$
      .pipe(
        filter(
          (action: any) =>
            action.type === EntryActionTypes.CREATE_ENTRY_SUCCESS ||
            action.type === EntryActionTypes.UPDATE_ENTRY_SUCCESS
        )
      )
      .subscribe(() => {
        this.cleanForm();
      });
  }

  onClearedComponent({term}) {
    const isSearchEmpty = (term === '');
    if (isSearchEmpty) {
      this.isTechnologiesDisabled = true;
      this.entryForm.patchValue({
        project_id: '',
        project_name: '',
      });
    }
    this.listProjectsShowed = isSearchEmpty ? this.listRecentProjects : this.listProjects;
  }

  onSelectedProject(item) {
    if (item) {
      this.isTechnologiesDisabled = false;
      this.projectSelected.emit({ projectId: item.id });
      this.entryForm.patchValue({
        project_id: item.id,
        project_name: item.search_field,
      });
      this.listProjectsShowed = this.listRecentProjects;
    }
  }

  onStartDateChange($event: string) {
    this.end_date.setValue($event);
  }

  getTimeDifference(): string {
    const startDate = moment(`${this.start_date.value} ${this.start_hour.value}`);
    const endDate = moment(`${this.end_date.value} ${this.end_hour.value}`);
    if (startDate <= endDate) {
      const diffDate = endDate.diff(startDate);
      const duration = moment.duration(diffDate);
      return moment.utc(duration.asMilliseconds()).format('HH:mm');
    }
    return '00:00';
  }

  getRecentProjects(): void {
    this.store.dispatch(new projectActions.LoadProjects());
    const recentProjects$ = this.store.pipe(select(getRecentProjects));
    recentProjects$.subscribe((projects) => {
      if (projects) {
        this.listRecentProjects = [];
        projects.forEach((project) => {
          const projectWithSearchField = { ...project };
          projectWithSearchField.search_field = `${project.customer.name} - ${project.name}`;
          this.listRecentProjects.push(projectWithSearchField);
        });
        this.listProjectsShowed = this.listRecentProjects;
      }else{
        this.listRecentProjects = this.listProjects;
      }
    });
  }

  ngOnChanges(): void {
    this.goingToWorkOnThis = this.entryToEdit ? this.entryToEdit.running ?? true : false;
    this.shouldRestartEntry = false;
    this.getRecentProjects();
    if (this.entryToEdit) {
      this.isTechnologiesDisabled = false;
      this.selectedTechnologies = this.entryToEdit.technologies;
      const projectFound = this.listProjects.find((project) => project.id === this.entryToEdit.project_id);
      this.entryForm.setValue({
        project_name: projectFound ? projectFound.search_field : '',
        project_id: this.entryToEdit.project_id,
        activity_id: this.entryToEdit.activity_id,
        description: this.entryToEdit.description,
        start_date: formatDate(get(this.entryToEdit, 'start_date', ''), DATE_FORMAT, 'en'),
        end_date: formatDate(get(this.entryToEdit, 'end_date'), DATE_FORMAT, 'en'),
        start_hour: formatDate(get(this.entryToEdit, 'start_date', '00:00'), 'HH:mm', 'en'),
        end_hour: formatDate(get(this.entryToEdit, 'end_date', '00:00'), 'HH:mm', 'en'),
        uri: this.entryToEdit.uri,
        technology: '',
      });

      this.activities$ = this.store.pipe(
        select(allActiveActivities),
        mergeMap((activeActivities) =>
          this.store.pipe(
            select(allActivities),
            map((activities) =>
              this.findInactiveActivity(activities) !== undefined
                ? [...activeActivities, this.findInactiveActivity(activities)]
                : activeActivities
            )
          )
        )
      );
    } else {
      this.cleanForm();
      this.isTechnologiesDisabled = true;
      this.activities$ = this.selectActiveActivities();
    }
  }

  cleanForm(skipProject: boolean = false): void {
    this.selectedTechnologies = [];
    const projectNameField = this.project_name.value;
    const projectName = get(projectNameField, 'search_field', projectNameField);
    this.entryForm.reset({
      project_name: skipProject ? projectName : '',
      project_id: skipProject ? this.project_id.value : '',
      activity_id: '',
      description: '',
      start_date: formatDate(new Date(), DATE_FORMAT, 'en'),
      end_date: formatDate(new Date(), DATE_FORMAT, 'en'),
      start_hour: '00:00',
      end_hour: '00:00',
      uri: '',
      technology: '',
    });
  }

  cleanFieldsForm(): void {
    this.cleanForm(true);
  }

  selectActiveActivities() {
    return this.store.pipe(select(allActiveActivities));
  }

  findInactiveActivity(activities) {
    return activities.find(
      (activity) => activity.status === 'inactive' && activity.id === this.entryToEdit.activity_id
    );
  }

  onTechnologiesUpdated($event: string[]) {
    this.selectedTechnologies = $event;
  }

  getCurrentDate(): string {
    return moment(new Date()).format(DATE_FORMAT_YEAR);
  }

  get project_id() {
    return this.entryForm.get('project_id');
  }

  get project_name() {
    return this.entryForm.get('project_name');
  }

  get activity_id() {
    return this.entryForm.get('activity_id');
  }

  get start_date() {
    return this.entryForm.get('start_date');
  }

  get end_date() {
    return this.entryForm.get('end_date');
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

  isStartTimeEntryAfterEndedEntry(): boolean {
    const startDate = moment(`${this.start_date.value} ${this.start_hour.value}`);
    const endDate = moment(`${this.end_date.value} ${this.end_hour.value}`);
    return startDate >= endDate;
  }

  getDateISOFormat(date: string, hourAndMinutes: string, seconds: number, miliseconds: number): string {
    hourAndMinutes = hourAndMinutes.trim();
    const secondsInISOFormat: string = this.getNumberInISOFormat(seconds);
    const milisecondsInISOFormat: string = this.getNumberInISOFormat(miliseconds);
    const ISOFormat = `${date}T${hourAndMinutes}:${secondsInISOFormat}.${milisecondsInISOFormat}`;
    return new Date(ISOFormat).toISOString();
  }

  getNumberInISOFormat(numberToFormat: number): string {
    const limitSingleNumber = 9;
    const isNumberGreaterThanLimitNumber = numberToFormat > limitSingleNumber;
    return isNumberGreaterThanLimitNumber ? numberToFormat.toString() : `0${numberToFormat}`;
  }

  dateToSubmit(date: string, hour: string) {
    const timeEntryISODate: string = get(this.entryToEdit, date);
    let seconds = 0;
    let miliseconds = 0;

    if (timeEntryISODate) {
      const timeEntryDate: Date = new Date(timeEntryISODate);
      seconds = timeEntryDate.getSeconds();
      miliseconds = timeEntryDate.getMilliseconds();
    }

    const newEntryDate: string = this.entryForm.value[date];
    const newEntryHour: string = this.entryForm.value[hour];

    const updatedDate: string = this.getDateISOFormat(newEntryDate, newEntryHour, seconds, miliseconds);
    const initialDate = get(this.entryToEdit, date, updatedDate);
    const dateHasNotChanged = initialDate === updatedDate;
    const result = dateHasNotChanged ? initialDate : updatedDate;
    return result;
  }

  onSubmit() {
    if (this.entryForm.invalid) {
      this.toastrService.warning('Make sure to select a project and activity');
      return;
    }

    const startDateToSubmit = this.dateToSubmit('start_date', 'start_hour');
    const endDateToSubmit = this.dateToSubmit('end_date', 'end_hour');

    if (this.isStartTimeEntryAfterEndedEntry() && !this.goingToWorkOnThis) {
      this.toastrService.error('You must end the time entry after it started');
      return;
    }

    const entry = {
      project_id: this.entryForm.value.project_id,
      activity_id: this.entryForm.value.activity_id,
      technologies: get(this, 'selectedTechnologies', []),
      description: this.entryForm.value.description,
      start_date: startDateToSubmit,
      end_date: endDateToSubmit,
      uri: this.entryForm.value.uri,
      timezone_offset: new Date().getTimezoneOffset(),
    };

    if (this.goingToWorkOnThis && this.canMarkEntryAsWIP) {
      delete entry.end_date;
    }

    const isStartDateInTheFuture = moment(startDateToSubmit).isAfter(moment());
    const isEndDateInTheFuture = moment(endDateToSubmit).isAfter(moment());
    const timeEntryIsInTheFuture = isStartDateInTheFuture || isEndDateInTheFuture;

    if (timeEntryIsInTheFuture) {
      this.toastrService.error('You cannot start a time-entry in the future');
      return;
    }
    this.saveEntry.emit({ entry, shouldRestartEntry: this.shouldRestartEntry });
  }

  onclickFormAction(isProjectSelected: boolean) {
    if (isProjectSelected) {
      this.toastrService.warning('Please, first select a project');
    }
  }

  onGoingToWorkOnThisChange(event: any) {
    this.goingToWorkOnThis = event.currentTarget.checked;
    if (!this.goingToWorkOnThis) {
      this.entryForm.patchValue({
        end_date: formatDate(get(this.entryToEdit, 'start_date', ''), DATE_FORMAT, 'en'),
        end_hour: formatDate(new Date(), 'HH:mm', 'en'),
      });
    }
    this.shouldRestartEntry = !this.entryToEdit?.running && this.goingToWorkOnThis;
  }

  openOrCloseDatePicker(datepicker: MatDatepicker<Date>): void {
    return datepicker.opened ? datepicker.close() : datepicker.open();
  }
}
