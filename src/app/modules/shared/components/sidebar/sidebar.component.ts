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
      { route: '/time-clock', icon: 'far fa-clock', text: 'Time Clock' },
      { route: '/time-entries', icon: 'far fa-list-alt', text: 'Time Entries' },
      { route: '/reports', icon: 'fas fa-chart-pie', text: 'Reports' },
      // { route: '/project-management', icon: 'far fa-folder-open', text: 'Projects' },
      { route: '/activities-management', icon: 'far fa-file-alt', text: 'Activities' },
      { route: '/customer-managment', icon: 'fas fa-users-cog', text: 'Customer' },
    ];
  }
}
