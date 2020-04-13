import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITEMS_PER_PAGE } from 'src/environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  initPage1 = 1;
  itemsPerPage = ITEMS_PER_PAGE;

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

  activateCustomerForm() {
    this.showCustomerForm = true;
    this.changeShowCustomerForm.emit(this.showCustomerForm);
  }
}
