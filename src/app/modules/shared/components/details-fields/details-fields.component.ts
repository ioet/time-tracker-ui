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

import { allTechnologies } from '../../store/technology.selectors';
import { Technology, Project } from '../../models';

import { ProjectState } from '../../../project-management/store/project.reducer';
import { TechnologyState } from '../../store/technology.reducers';
import { allProjects } from '../../../project-management/store/project.selectors';
import * as projectActions from '../../../project-management/store/project.actions';

type Merged = TechnologyState & ProjectState;

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
  keyword = 'name';
  showlist: boolean;

  constructor(private formBuilder: FormBuilder, private store: Store<Merged>, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.showlist && !this.list.nativeElement.contains(e.target)) {
        this.showlist = false;
      }
    });
    this.entryForm = this.formBuilder.group({
      project: '',
      activity: '',
      ticket: '',
      comments: '',
    });
  }

  ngOnInit(): void {
    const technologies$ = this.store.pipe(select(allTechnologies));
    technologies$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.technology = response.technologyList;
    });

    this.store.dispatch(new projectActions.LoadProjects());
    const projects$ = this.store.pipe(select(allProjects));
    projects$.subscribe((response) => {
      this.listProjects = response.projectList;
    });
  }

  ngOnChanges(): void {
    if (this.entryToEdit) {
      this.selectedTechnology = this.entryToEdit.technologies;

      this.entryForm.setValue({
        project: this.entryToEdit.project,
        activity: this.entryToEdit.activity,
        ticket: this.entryToEdit.ticket,
        comments: this.entryToEdit.comments,
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
    this.saveEntry.emit(this.entryForm.value);
    this.closeModal.nativeElement.click();
  }
}
