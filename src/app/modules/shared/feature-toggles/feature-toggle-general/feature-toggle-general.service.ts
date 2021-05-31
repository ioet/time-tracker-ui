import { map } from 'rxjs/operators';
import { FeatureToggle } from './../../../../../environments/enum';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureManagerService } from '../feature-toggle-manager.service';
import { FeatureToggleModel } from '../feature-toggle.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleGeneralService {
  constructor(private featureManagerService: FeatureManagerService) {}

  isActivated(featureToggle: FeatureToggle): Observable<boolean> {
    return this.featureManagerService.isToggleEnabledForUser(featureToggle);
  }

  getActivated(): Observable<FeatureToggleModel[]>{
    return this.featureManagerService.getAllFeatureToggleEnableForUser();
  }
}
