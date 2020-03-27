import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-fields',
  templateUrl: './details-fields.component.html',
  styleUrls: ['./details-fields.component.scss']
})
export class DetailsFieldsComponent implements OnChanges {
  @Input() entryToEdit;
  @Input() formType: string;
  @Output() saveEntry = new EventEmitter();
  @ViewChild('closeModal') closeModal: ElementRef;
  entryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.entryForm = this.formBuilder.group({
      project: '',
      activity: '',
      ticket: '',
      technology: '',
      comments: ''
    });
  }

  ngOnChanges(): void {
    if (this.entryToEdit) {
      this.entryForm.setValue({
        project: this.entryToEdit.project,
        activity: this.entryToEdit.activity,
        ticket: this.entryToEdit.ticket,
        technology: this.entryToEdit.technology,
        comments: this.entryToEdit.comments
      });
    }
  }

  onSubmit() {
    this.saveEntry.emit(this.entryForm.value);
    this.closeModal.nativeElement.click();
  }
}
