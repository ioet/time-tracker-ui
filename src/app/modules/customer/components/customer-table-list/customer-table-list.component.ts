import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-table-list',
  templateUrl: './customer-table-list.component.html',
  styleUrls: ['./customer-table-list.component.scss'],
})
export class CustomerTableListComponent implements OnInit {
  initPage1: number = 1;

  customers = [
    {
      id: '1',
      name: 'GoSpace',
    },
    {
      id: '2',
      name: 'GruHub',
    },
    {
      id: '3',
      name: 'e&y',
    },
    {
      id: '4',
      name: 'Mido',
    },
  ];

  @Input() showCustomerForm;
  @Output() changeShowCustomerForm = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  activateCustomerForm() {
    this.showCustomerForm = true;
    this.changeShowCustomerForm.emit(this.showCustomerForm);
  }
}
