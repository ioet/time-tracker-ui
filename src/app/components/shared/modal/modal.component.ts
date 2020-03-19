import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Project } from '../../../interfaces/project'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() project: Project;
  @Output() removeProject = new EventEmitter();

  @ViewChild('cancelDeleteModal') cancelDeleteModal: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  removedProject(projectId) {
    this.removeProject.emit(projectId);
    this.cancelDeleteModal.nativeElement.click();
  }
}
