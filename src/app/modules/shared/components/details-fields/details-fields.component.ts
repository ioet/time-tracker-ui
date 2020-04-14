import { Component, OnChanges, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as actions from '../../store/technology.actions';

import { allTechnologies } from '../../store/technology.selectors';
import { Technology } from '../../models';

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
  technologies: Technology;
  filterTechnology = '';
  selectedTechnology: string[] = [];
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private store: Store<Technology>) {
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
      this.technologies = response.technologyList;
    });
  }

  ngOnChanges(): void {
    if (this.entryToEdit) {
      this.selectedTechnology = this.entryToEdit.technology;

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
      this.store.dispatch(new actions.LoadTechnology(value));
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
