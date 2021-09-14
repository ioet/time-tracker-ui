import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemSidebar } from './models/item-sidebar.model';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserInfoService } from 'src/app/modules/user/services/user-info.service';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  itemsSidebar: ItemSidebar[] = [];
  navStart;
  sidebarItems$: Subscription;

  constructor(private router: Router, private userInfoService: UserInfoService, private azureAdB2CService: AzureAdB2CService) {
    this.navStart = this.router.events.pipe(
      filter((evt) => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit(): void {
    const currentRouting = this.router.routerState.snapshot.url;
    this.sidebarItems$ = this.getSidebarItems().subscribe(() => this.highlightMenuOption(currentRouting));
    this.navStart.subscribe((evt) => {
      this.highlightMenuOption(evt.url);
    });
  }

  ngOnDestroy(): void {
    this.sidebarItems$.unsubscribe();
  }

  toggleSideBar() {
    $('#wrapper').toggleClass('toggled');
    $('#show-sidebar').toggle();
    $('#hide-sidebar').toggle();
  }

  getSidebarItems(): Observable<void> {
    return this.userInfoService.isAdmin().pipe(
      map((isAdmin) => {
        if (isAdmin) {
          this.itemsSidebar = [
            { route: '/time-clock', icon: 'far fa-clock', text: 'Time Clock', active: false },
            { route: '/time-entries', icon: 'far fa-file-alt', text: 'Time Entries', active: false },
            { route: '/reports', icon: 'fas fa-chart-bar', text: 'Reports', active: false },
            { route: '/activities-management', icon: 'fas fa-list-ol', text: 'Activities', active: false },
            { route: '/customers-management', icon: 'fas fa-users', text: 'Customers', active: false },
            { route: '/users', icon: 'fas fa-user-friends', text: 'Users', active: false },
          ];
        } else {
          this.itemsSidebar = [
            { route: '/time-clock', icon: 'far fa-clock', text: 'Time Clock', active: false },
            { route: '/time-entries', icon: 'far fa-file-alt', text: 'Time Entries', active: false },
          ];
        }
      })
    );
  }

  highlightMenuOption(route) {
    this.itemsSidebar.map((item) => (item.active = false));
    this.itemsSidebar.filter((item) => item.route === route).map((item) => (item.active = true));
  }

  logout() {
    this.azureAdB2CService.logout();
  }
}
