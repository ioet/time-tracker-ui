import {AzureAdB2CService} from 'src/app/modules/login/services/azure.ad.b2c.service';
import {Component, OnInit} from '@angular/core';
import {ItemSidebar} from './models/item-sidebar.model';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import { FeatureManagerService } from '../../feature-toggles/feature-toggle-manager.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  itemsSidebar: ItemSidebar[] = [];
  navStart;

  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private featureManagerService: FeatureManagerService,
  ) {
    this.navStart = this.router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit(): void {
    this.toggleSideBar();
    this.getSidebarItems();
    this.toggleListTechnologies(this.itemsSidebar);
    this.highlightMenuOption(this.router.routerState.snapshot.url);
    this.navStart.subscribe(evt => {
      this.highlightMenuOption(evt.url);
    });
  }

  toggleSideBar() {
    $('#menu-toggle').on('click', (e) => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

  getSidebarItems() {
    if (this.azureAdB2CService.isAdmin()) {
      this.itemsSidebar = [
        {route: '/time-clock', icon: 'fas fa-clock', text: 'Time Clock', active: false},
        {route: '/time-entries', icon: 'fas fa-list-alt', text: 'Time Entries', active: false},
        {route: '/reports', icon: 'fas fa-chart-pie', text: 'Reports', active: false},
        {route: '/activities-management', icon: 'fas fa-file-alt', text: 'Activities', active: false},
        {route: '/customers-management', icon: 'fas fa-user', text: 'Customers', active: false},
        {route: '/users', icon: 'fas fa-user', text: 'Users', active: false},
      ];
    } else {
      this.itemsSidebar = [
        {route: '/time-clock', icon: 'fas fa-clock', text: 'Time Clock', active: false},
        {route: '/time-entries', icon: 'fas fa-list-alt', text: 'Time Entries', active: false},
      ];
    }
  }

  toggleListTechnologies(itemsSidebar: ItemSidebar[]){
    this.featureManagerService
    .isToggleEnabledForUser('ui-list-technologies')
    .subscribe((enabled) => {
      if (enabled === true){
        const listTechnologiesItem = {
          route: '/technology-report',
          icon: 'fas fa-user',
          text: 'Technology Report',
          active: false
        };
        itemsSidebar.push(listTechnologiesItem);
      }
    });
  }

  highlightMenuOption(route) {
    this.itemsSidebar.map(item => item.active = false);
    this.itemsSidebar.filter(item => item.route === route).map(item => item.active = true);
  }
}
