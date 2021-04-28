import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemSidebar } from './models/item-sidebar.model';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FeatureManagerService } from '../../feature-toggles/feature-toggle-manager.service';
import { UserInfoService } from 'src/app/modules/user/services/user-info.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  itemsSidebar: ItemSidebar[] = [];
  navStart;
  sidebarItems$: Subscription;

  constructor(
    private router: Router,
    private userInfoService: UserInfoService,
    private featureManagerService: FeatureManagerService,
  ) {
    this.navStart = this.router.events.pipe(
      filter((evt) => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit(): void {
    this.toggleSideBar();
    this.sidebarItems$ = this.getSidebarItems().subscribe();
    this.toggleListTechnologies(this.itemsSidebar);
    this.highlightMenuOption(this.router.routerState.snapshot.url);
    this.navStart.subscribe((evt) => {
      this.highlightMenuOption(evt.url);
    });
  }
  ngOnDestroy(): void {
    this.sidebarItems$.unsubscribe();
  }

  toggleSideBar() {
    $('#menu-toggle').on('click', (e) => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

  getSidebarItems(): Observable<void> {
    return this.userInfoService.isAdmin().pipe(
      map((isAdmin) => {
        if (isAdmin) {
          this.itemsSidebar = [
            { route: '/time-clock', icon: 'fas fa-clock', text: 'Time Clock', active: false },
            { route: '/time-entries', icon: 'fas fa-list-alt', text: 'Time Entries', active: false },
            { route: '/reports', icon: 'fas fa-chart-pie', text: 'Reports', active: false },
            { route: '/activities-management', icon: 'fas fa-file-alt', text: 'Activities', active: false },
            { route: '/customers-management', icon: 'fas fa-user', text: 'Customers', active: false },
            { route: '/users', icon: 'fas fa-user', text: 'Users', active: false },
          ];
        } else {
          this.itemsSidebar = [
            { route: '/time-clock', icon: 'fas fa-clock', text: 'Time Clock', active: false },
            { route: '/time-entries', icon: 'fas fa-list-alt', text: 'Time Entries', active: false },
          ];
        }
      })
    );
  }

  toggleListTechnologies(itemsSidebar: ItemSidebar[]) {
    this.featureManagerService
      .isToggleEnabledForUser('ui-list-technologies')
      .subscribe((enabled) => {
        if (enabled === true) {
          const listTechnologiesItem = {
            route: '/technology-report',
            icon: 'fas fa-user',
            text: 'Technology Report',
            active: false,
          };
          itemsSidebar.push(listTechnologiesItem);
        }
      });
  }

  highlightMenuOption(route) {
    this.itemsSidebar.map((item) => (item.active = false));
    this.itemsSidebar.filter((item) => item.route === route).map((item) => (item.active = true));
  }
}
