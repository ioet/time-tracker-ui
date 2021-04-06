import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoadUser } from 'src/app/modules/user/store/user.actions';
import { AzureAdB2CService } from '../login/services/azure.ad.b2c.service';
import { FeatureSwitchGroupService } from '../shared/feature-toggles/switch-group/feature-switch-group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  FTSwitchGroup$: Subscription;

  constructor(
    private featureSwitchGroup: FeatureSwitchGroupService,
    private azureAdB2CService: AzureAdB2CService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.FTSwitchGroup$ = this.featureSwitchGroup.isActivated().subscribe((enabled) => {
      if (enabled) {
        const userId = this.azureAdB2CService.getUserId();
        this.store.dispatch(new LoadUser(userId));
      }
    });
  }

  ngOnDestroy() {
    this.FTSwitchGroup$.unsubscribe();
  }
}
