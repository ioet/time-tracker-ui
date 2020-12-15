import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { FeatureManagerService } from 'src/app/modules/shared/feature-toggles/feature-toggle-manager.service';

@Injectable({
  providedIn: 'root'
})
export class TechnologiesReportGuard implements CanActivate {

  constructor(
    private featureManagerService: FeatureManagerService,
    private router: Router
  ) { }

  canActivate() {
    return this.featureManagerService
    .isToggleEnabledForUser('ui-list-technologies')
    .pipe(map((enabled) => {
      if (enabled === true) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }));
  }
}
