import { getActiveTimeEntry } from './../../store/entry.selectors';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Technology, Activity, NewEntry } from '../../../shared/models';
import { allTechnologies } from '../../../shared/store/technology.selectors';
import * as actions from '../../../shared/store/technology.actions';

import { ProjectState } from '../../../customer-management/components/projects/components/store/project.reducer';
import { TechnologyState } from '../../../shared/store/technology.reducers';
import { LoadActivities, ActivityState, allActivities } from '../../../activities-management/store';

import * as entryActions from '../../store/entry.actions';

type Merged = TechnologyState & ProjectState & ActivityState;

@Component({
  selector: 'app-entry-fields',
  templateUrl: './entry-fields.component.html',
  styleUrls: ['./entry-fields.component.scss'],
})
export class EntryFieldsComponent implements OnInit {

  @ViewChild('list') list: ElementRef;
  entryForm: FormGroup;
  technology: Technology;
  selectedTechnology: string[] = [];
  isLoading = false;
  activities: Activity[] = [];
  keyword = 'name';
  showlist: boolean;
  activeEntry;
  newData;

  constructor(private formBuilder: FormBuilder, private store: Store<Merged>, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.showlist && !this.list.nativeElement.contains(e.target)) {
        this.showlist = false;
      }
    });
    this.entryForm = this.formBuilder.group({
      description: '',
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

    this.store.dispatch(new LoadActivities());
    const activities$ = this.store.pipe(select(allActivities));
    activities$.subscribe((response) => {
      this.activities = response;
    });

    const activeEntry$ = this.store.pipe(select(getActiveTimeEntry));
    activeEntry$.subscribe((response) => {
      if (response) {
        this.activeEntry = response;
        this.setDataToUpdate(this.activeEntry);
        this.newData = {
          id: this.activeEntry.id,
          project_id: this.activeEntry.project_id,
          uri: this.activeEntry.uri,
        };
      }
    });
  }

  setDataToUpdate(entryData: NewEntry) {
    if (entryData) {
      this.entryForm.patchValue({
        description: entryData.description,
        uri: entryData.uri,
      });
      if (entryData.technologies) {
        this.selectedTechnology = entryData.technologies;
      } else {
        this.selectedTechnology = [];
      }
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
      this.store.dispatch(
        new entryActions.UpdateActiveEntry({ ...this.newData, technologies: this.selectedTechnology })
      );
      this.showlist = false;
      this.entryForm.get('technology').reset();
    }
  }

  removeTag(index: number) {
    const technologies = this.selectedTechnology.filter((item) => item !== this.selectedTechnology[index]);
    this.store.dispatch(new entryActions.UpdateActiveEntry({ ...this.newData, technologies }));
  }

  onSubmit() {
    this.store.dispatch(new entryActions.UpdateActiveEntry({ ...this.newData, ...this.entryForm.value }));
  }

}
