import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter();
  @Input() title: string;
  @Input() body: string;

  @ViewChild('cancelDeleteModal') cancelDeleteModal: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.closeModalEvent.emit();
    this.cancelDeleteModal.nativeElement.click();
  }
}
