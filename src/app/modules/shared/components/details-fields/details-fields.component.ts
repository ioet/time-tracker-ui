import {
  Component,
  OnChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store, select} from '@ngrx/store';
import {formatDate} from '@angular/common';

import {Project, Activity} from '../../models';
import {ProjectState} from '../../../customer-management/components/projects/components/store/project.reducer';
import {TechnologyState} from '../../store/technology.reducers';
import {LoadActivities, ActivityState, allActivities} from '../../../activities-management/store';
import {getProjects} from '../../../customer-management/components/projects/components/store/project.selectors';
import * as projectActions from '../../../customer-management/components/projects/components/store/project.actions';
import {EntryState} from '../../../time-clock/store/entry.reducer';
import * as entryActions from '../../../time-clock/store/entry.actions';
import {getUpdateError, getCreateError} from 'src/app/modules/time-clock/store/entry.selectors';
type Merged = TechnologyState & ProjectState & ActivityState & EntryState;

@Component({
  selector: 'app-details-fields',
  templateUrl: './details-fields.component.html',
  styleUrls: ['./details-fields.component.scss'],
})
export class DetailsFieldsComponent implements OnChanges, OnInit {
  @Input() entryToEdit;
  @Input() formType: string;
  @Output() saveEntry = new EventEmitter();
  @ViewChild('closeModal') closeModal: ElementRef;
  entryForm: FormGroup;
  selectedTechnologies: string[] = [];
  isLoading = false;
  listProjects: Project[] = [];
  activities: Activity[] = [];
  keyword = 'name';
  showlist: boolean;
  errorDate: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<Merged>) {
    this.entryForm = this.formBuilder.group({
      project_id: '',
      activity_id: '',
      description: '',
      start_date: '',
      end_date: '',
      start_hour: '00:00',
      end_hour: '00:00',
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
  }

  ngOnChanges(): void {
    if (this.entryToEdit) {
      this.selectedTechnologies = this.entryToEdit.technologies;
      this.entryForm.setValue({
        project_id: this.entryToEdit.project_id,
        activity_id: this.entryToEdit.activity_id,
        description: this.entryToEdit.description,
        start_date: this.entryToEdit.start_date ? formatDate(this.entryToEdit.start_date, 'yyyy-MM-dd', 'en') : '',
        start_hour: this.entryToEdit.start_date ? formatDate(this.entryToEdit.start_date, 'HH:mm', 'en') : '00:00',
        end_date: this.entryToEdit.end_date ? formatDate(this.entryToEdit.end_date, 'yyyy-MM-dd', 'en') : '',
        end_hour: this.entryToEdit.end_date ? formatDate(this.entryToEdit.end_date, 'HH:mm', 'en') : '00:00',
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
      start_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      start_hour: '00:00',
      end_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      end_hour: '00:00',
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

  get start_date() {
    return this.entryForm.get('start_date');
  }

  get start_hour() {
    return this.entryForm.get('start_hour');
  }

  get end_date() {
    return this.entryForm.get('end_date');
  }

  get end_hour() {
    return this.entryForm.get('end_hour');
  }
  /* istanbul ignore next */
  closeEntryModal() {
    this.close();
    this.closeModal?.nativeElement?.click();
  }

  close() {
    this.entryForm.reset();
    this.errorDate = false;
    this.cleanForm();
  }

  onSubmit() {
    const entry = {
      project_id: this.entryForm.value.project_id,
      activity_id: this.entryForm.value.activity_id,
      technologies: this.selectedTechnologies ? this.selectedTechnologies : [],
      description: this.entryForm.value.description,
      start_date: `${this.entryForm.value.start_date}T${this.entryForm.value.start_hour}`,
      end_date: `${this.entryForm.value.end_date}T${this.entryForm.value.end_hour}`,
      uri: this.entryForm.value.uri,
    };

    if (new Date(entry.start_date) < new Date(entry.end_date)) {
      this.errorDate = false;
      this.saveEntry.emit(entry);
    } else {
      this.errorDate = true;
    }
  }
}
