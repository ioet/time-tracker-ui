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
  itemsSidebar: ItemSidebar[];
  navStart;
  sidebarItems$: Subscription;
  userName: string;
  userEmail: string;

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
    if (this.azureAdB2CService.isLogin()) {
      this.userName = this.azureAdB2CService.getName();
      this.userEmail = this.azureAdB2CService.getUserEmail();
      this.azureAdB2CService.setTenantId();
    }
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
            { route: '/time-clock', icon: 'assets/icons/clock.svg', text: 'Time Clock', active: false },
            { route: '/time-entries', icon: 'assets/icons/time-entries.svg', text: 'Time Entries', active: false },
            { route: '/reports', icon: 'assets/icons/reports.svg', text: 'Reports', active: false },
            { route: '/activities-management', icon: 'assets/icons/activities.svg', text: 'Activities', active: false },
            { route: '/customers-management', icon: 'assets/icons/customers.svg', text: 'Customers', active: false },
            { route: '/users', icon: 'assets/icons/users.svg', text: 'Users', active: false },
          ];
        } else {
          this.itemsSidebar = [
            { route: '/time-clock', icon: 'assets/icons/clock.svg', text: 'Time Clock', active: false },
            { route: '/time-entries', icon: 'assets/icons/time-entries.svg', text: 'Time Entries', active: false },
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
