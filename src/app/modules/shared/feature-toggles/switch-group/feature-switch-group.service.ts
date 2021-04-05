import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOGGLES } from 'src/environments/environment';
import { FeatureManagerService } from '../feature-toggle-manager.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureSwitchGroupService {
  constructor(private FTManager: FeatureManagerService) {}
  isActivated(): Observable<boolean> {
    return this.FTManager.isToggleEnabledForUser(TOGGLES.SWITCH_GROUP);
  }
}
