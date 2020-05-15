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
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as actions from '../../store/technology.actions';
import { formatDate } from '@angular/common';

import { allTechnologies } from '../../store/technology.selectors';
import { Technology, Project, Activity } from '../../models';

import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { TechnologyState } from '../../store/technology.reducers';
import { LoadActivities, ActivityState, allActivities } from '../../../activities-management/store';
import { getProjects } from '../../../customer-management/components/projects/components/store/project.selectors';
import * as projectActions from '../../../customer-management/components/projects/components/store/project.actions';
import { EntryState } from '../../../time-clock/store/entry.reducer';
import * as entryActions from '../../../time-clock/store/entry.actions';
import { getUpdateError, getCreateError } from 'src/app/modules/time-clock/store/entry.selectors';

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
  @ViewChild('list') list: ElementRef;
  entryForm: FormGroup;
  technology: Technology;
  selectedTechnologies: string[] = [];
  isLoading = false;
  listProjects: Project[] = [];
  activities: Activity[] = [];
  keyword = 'name';
  showlist: boolean;
  hoursValidation: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<Merged>, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.showlist && !this.list.nativeElement.contains(e.target)) {
        this.showlist = false;
      }
    });
    this.entryForm = this.formBuilder.group({
      project: '',
      activity: '',
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
    const technologies$ = this.store.pipe(select(allTechnologies));
    technologies$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.technology = response.technologyList;
    });

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
        this.closeEntryModal();
        this.store.dispatch(new entryActions.CleanEntryUpdateError(null));
      }
    });
    const createError$ = this.store.pipe(select(getCreateError));
    createError$.subscribe((createError) => {
      if (createError != null && !createError) {
        this.closeEntryModal();
        this.store.dispatch(new entryActions.CleanEntryCreateError(null));
      }
    });
  }

  ngOnChanges(): void {
    this.hoursValidation = false;
    if (this.entryToEdit) {
      this.selectedTechnologies = this.entryToEdit.technologies;
      const project = this.listProjects.find((p) => p.id === this.entryToEdit.project_id);
      const activity = this.activities.find((a) => a.id === this.entryToEdit.activity_id);
      this.entryForm.setValue({
        project: project ? project.name : '',
        activity: activity ? activity.name : '',
        description: this.entryToEdit.description,
        start_date: this.entryToEdit.start_date ? formatDate(this.entryToEdit.start_date, 'yyyy-MM-dd', 'en') : '',
        start_hour: this.entryToEdit.start_date ? formatDate(this.entryToEdit.start_date, 'HH:mm', 'en') : '00:00',
        end_date: this.entryToEdit.end_date ? formatDate(this.entryToEdit.end_date, 'yyyy-MM-dd', 'en') : '',
        end_hour: this.entryToEdit.end_date ? formatDate(this.entryToEdit.end_date, 'HH:mm', 'en') : '00:00',
        uri: this.entryToEdit.uri,
        technology: '',
      });
    } else {
      this.selectedTechnologies = [];
      this.entryForm.setValue({
        project: '',
        activity: '',
        description: '',
        start_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        start_hour: '00:00',
        end_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        end_hour: '00:00',
        uri: '',
        technology: '',
      });
    }
  }

  getTechnologies(value) {
    if (value.length >= 2) {
      this.showlist = true;
      this.store.dispatch(new actions.FindTechnology(value));
    }
  }

  onTechnologiesUpdated($event: string[]) {
    this.selectedTechnologies = $event;
  }

  get project() {
    return this.entryForm.get('project');
  }
  get activity() {
    return this.entryForm.get('activity');
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

  closeEntryModal() {
    this.entryForm.reset();
    this.closeModal.nativeElement.click();
  }

  onSubmit() {
    const activity = this.activities.find((a) => a.name === this.entryForm.value.activity);
    const project = this.listProjects.find((p) => p.name === this.entryForm.value.project);
    const entry = {
      project_id: project ? project.id : null,
      activity_id: activity ? activity.id : null,
      technologies: this.selectedTechnologies,
      description: this.entryForm.value.description,
      start_date: `${this.entryForm.value.start_date}T${this.entryForm.value.start_hour}`,
      end_date: `${this.entryForm.value.end_date}T${this.entryForm.value.end_hour}`,
      uri: this.entryForm.value.uri,
    };
    this.saveEntry.emit(entry);
  }
}
