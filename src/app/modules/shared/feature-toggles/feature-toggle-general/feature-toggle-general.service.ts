import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureManagerService } from '../feature-toggle-manager.service';
import { FeatureToggleModel } from '../feature-toggle.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleGeneralService {
  constructor(private featureManagerService: FeatureManagerService) {}

  getActivated(): Observable<FeatureToggleModel[]>{
    return this.featureManagerService.getAllFeatureToggleEnableForUser();
  }
}
