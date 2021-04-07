import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FeatureSwitchGroupService } from 'src/app/modules/shared/feature-toggles/switch-group/feature-switch-group.service';
import { UserInfoService } from 'src/app/modules/user/services/user-info.service';
import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private userInfoService: UserInfoService,
    private featureSwitchGroup: FeatureSwitchGroupService
  ) {}

  canActivate(): Observable<boolean> {
    return this.featureSwitchGroup.isActivated().pipe(
      mergeMap((enabled: boolean) => {
        return enabled ? this.isAdminBasedInGroup() : this.isAdminBasedInRole();
      }),
      map((isAdmin: boolean): boolean => {
        if (!isAdmin) {
          this.router.navigate(['login']);
        }
        return isAdmin;
      })
    );
  }

  isAdminBasedInRole(): Observable<boolean> {
    return of(this.azureAdB2CService.isAdmin());
  }

  isAdminBasedInGroup(): Observable<boolean> {
    return this.userInfoService.isAdmin();
  }
}
