import { Component } from '@angular/core';

@Component({
  selector: 'app-management-customer-projects',
  templateUrl: './management-customer-projects.component.html',
  styleUrls: ['./management-customer-projects.component.scss'],
})
export class ManagementCustomerProjectsComponent {
  areTabsActive: boolean;
  activeTab: string;
  constructor() {}

  activeTabs($areTabsActive: boolean) {
    setTimeout(() => {
      this.areTabsActive = $areTabsActive;
      this.activeTab = 'customer-information';
    }, 1);
  }

  showTab(activeTab: string) {
    this.activeTab = activeTab;
  }

}
