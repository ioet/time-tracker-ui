import { map } from 'rxjs/operators';
import { FeatureToggle } from './../../../../../environments/enum';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureManagerService } from '../feature-toggle-manager.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleGeneralService {
  constructor(private featureManagerService: FeatureManagerService) {}

  isActivated(featureToggle: FeatureToggle): Observable<boolean> {
    return this.featureManagerService.isToggleEnabledForUser(featureToggle);
  }
}
