import { Injectable } from '@angular/core';
import { FeatureToggleGeneralService } from '../feature-toggle-general/feature-toggle-general.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleCookiesService {

  constructor(
    private cookieService: CookieService,
    private featureToggleGeneralService: FeatureToggleGeneralService
  ) { }

  setCookies(){
    this.featureToggleGeneralService.getActivated().subscribe(
      (allFeaturToggle) => {
        for (const featureToggle of allFeaturToggle){
          this.cookieService.set(featureToggle.name, `${featureToggle.enabled}`, 30);
        }
      }
    );
  }
}
