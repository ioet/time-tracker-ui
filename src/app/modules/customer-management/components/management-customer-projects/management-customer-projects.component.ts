import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-management-customer-projects',
  templateUrl: './management-customer-projects.component.html',
  styleUrls: ['./management-customer-projects.component.scss'],
})
export class ManagementCustomerProjectsComponent {
  @Output() closeCustemerForm = new EventEmitter<boolean>();
  areTabsActive: boolean;
  activeTab: string;
  customerName: string;
  constructor() {}

  activeTabs($areTabsActive: boolean) {
    setTimeout(() => {
      this.areTabsActive = $areTabsActive;
      this.activeTab = 'customer-information';
    }, 1);
  }

  closeCustomer(event) {
    this.closeCustemerForm.emit(event);
  }

  showTab(activeTab: string) {
    this.activeTab = activeTab;
  }
  sendActivityName(event) {
    setTimeout(() => {
      this.customerName = event;
    }, 1);
  }
}
