import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';

import { select, Store } from '@ngrx/store';
import { getUserInfo } from './store/user.selectors';
import { Subscription } from 'rxjs';
import { LoadUser } from './store/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  name: string;
  userSubscription: Subscription;

  constructor(
    private azureAdB2CService: AzureAdB2CService, 
    private store: Store) {}

  ngOnInit(): void {
    if (this.azureAdB2CService.isLogin()) {
      this.name = this.azureAdB2CService.getName();
      let userId = this.azureAdB2CService.getUserId();
          
      this.store.dispatch(new LoadUser(userId));
      this.userSubscription = this.store
      .pipe(select(getUserInfo))
      .subscribe((response) => {
        console.log(response)
      })
      this.azureAdB2CService.setTenantId();
    }
  }

  logout() {
    this.azureAdB2CService.logout();
  }
}
