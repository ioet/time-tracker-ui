import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  initPage1 = 1;

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
