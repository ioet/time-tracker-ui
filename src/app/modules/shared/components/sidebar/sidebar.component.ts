import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { Component, OnInit } from '@angular/core';
import { ItemSidebar } from './models/item-sidebar.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  itemsSidebar: ItemSidebar[] = [];

  constructor(private azureAdB2CService: AzureAdB2CService) {}

  ngOnInit(): void {
    this.getItemsSidebar();
  }

  getItemsSidebar() {
    if (this.azureAdB2CService.isAdmin()) {
      this.itemsSidebar = [
        { route: '/time-clock', icon: 'fas fa-clock', text: 'Time Clock' },
        { route: '/time-entries', icon: 'fas fa-list-alt', text: 'Time Entries' },
        { route: '/reports', icon: 'fas fa-chart-pie', text: 'Reports' },
        { route: '/activities-management', icon: 'fas fa-file-alt', text: 'Activities' },
        { route: '/customers-management', icon: 'fas fa-user', text: 'Customers' },
      ];
    } else {
      this.itemsSidebar = [
        { route: '/time-clock', icon: 'fas fa-clock', text: 'Time Clock' },
        { route: '/time-entries', icon: 'fas fa-list-alt', text: 'Time Entries' },
      ];
    }
  }
}
