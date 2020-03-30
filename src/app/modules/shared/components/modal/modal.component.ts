import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { Project, Entry } from '../../models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() list: Project & Entry;
  @Output() removeList = new EventEmitter();

  @ViewChild('cancelDeleteModal') cancelDeleteModal: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  removeListById(projectId: string) {
    this.removeList.emit(projectId);
    this.cancelDeleteModal.nativeElement.click();
  }
}
