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

type Merged = TechnologyState & ProjectState & ActivityState;

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
  selectedTechnology: string[] = [];
  isLoading = false;
  listProjects: Project[] = [];
  activities: Activity[] = [];
  keyword = 'name';
  showlist: boolean;
  project: any = {};
  projectName: any = {};

  constructor(private formBuilder: FormBuilder, private store: Store<Merged>, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.showlist && !this.list.nativeElement.contains(e.target)) {
        this.showlist = false;
      }
    });
    this.project = '';
    this.entryForm = this.formBuilder.group({
      activity: '',
      description: '',
      start_date: '',
      end_date: '',
      start_hour: '00:00',
      end_hour: '00:00',
      uri: '',
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
  }

  ngOnChanges(): void {
    if (this.entryToEdit) {
      this.selectedTechnology = this.entryToEdit.technologies;
      this.project = this.listProjects.find((p) => p.id === this.entryToEdit.project_id);
      const activity = this.activities.find((a) => a.id === this.entryToEdit.activity_id);
      this.projectName = this.project.name;
      this.entryForm.setValue({
        activity: activity ? activity.name : '',
        description: this.entryToEdit.description,
        start_date: this.entryToEdit.start_date ? formatDate(this.entryToEdit.start_date, 'yyyy-MM-dd', 'en') : '',
        start_hour: this.entryToEdit.start_date ? formatDate(this.entryToEdit.start_date, 'HH:mm', 'en') : '00:00',
        end_date: this.entryToEdit.end_date ? formatDate(this.entryToEdit.end_date, 'yyyy-MM-dd', 'en') : '',
        end_hour: this.entryToEdit.end_date ? formatDate(this.entryToEdit.end_date, 'HH:mm', 'en') : '00:00',
        uri: this.entryToEdit.uri,
      });
    } else {
      this.selectedTechnology = [];
      this.project = '';
      this.projectName = '';
      this.entryForm.setValue({
        activity: '',
        description: '',
        start_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        start_hour: '00:00',
        end_date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        end_hour: '00:00',
        uri: '',
      });
    }
  }

  getTechnologies(value) {
    if (value.length >= 2) {
      this.showlist = true;
      this.store.dispatch(new actions.FindTechnology(value));
    }
  }

  setTechnology(name: string) {
    const index = this.selectedTechnology.indexOf(name);
    if (index > -1) {
      this.removeTag(index);
    } else if (this.selectedTechnology.length < 10) {
      this.selectedTechnology = [...this.selectedTechnology, name];
    }
  }

  removeTag(index) {
    this.selectedTechnology.splice(index, 1);
  }

  onSubmit() {
    const activity = this.activities.find((a) => a.name === this.entryForm.value.activity);
    this.project = this.projectName.id ? this.projectName : this.project;
    const entry = {
      project_id: this.project.id,
      activity_id: activity ? activity.id : null,
      technologies: this.selectedTechnology,
      description: this.entryForm.value.description,
      start_date: `${this.entryForm.value.start_date}T${this.entryForm.value.start_hour}`,
      end_date: `${this.entryForm.value.end_date}T${this.entryForm.value.end_hour}`,
      uri: this.entryForm.value.uri,
    };
    this.saveEntry.emit(entry);
    this.closeModal.nativeElement.click();
  }
}
