import { Component, OnInit } from '@angular/core';
import { ItemSidebar } from './models/item-sidebar.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  itemsSidebar: ItemSidebar[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getItemsSidebar();
  }

  getItemsSidebar() {
    this.itemsSidebar = [
      { route: '/time-clock', icon: 'fas fa-clock', text: 'Time Clock' },
      { route: '/time-entries', icon: 'fas fa-list-alt', text: 'Time Entries' },
      { route: '/reports', icon: 'fas fa-chart-pie', text: 'Reports' },
      { route: '/activities-management', icon: 'fas fa-file-alt', text: ' Activities' },
      { route: '/customers-management', icon: 'fas fa-user', text: 'Customers' },
    ];
  }
}
