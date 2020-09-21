import { Injectable } from '@angular/core';
import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { FeatureFilterConfiguration } from './feature-filter-configuration';
import { FeatureFilterTypes } from './feature-filter-types';
import { FeatureFilterModel } from './feature-filter.model';
import { TargetingFilterParameters } from './targeting/targeting-feature-filter-parameters';
import { TargetingFeatureFilterModel } from './targeting/targeting-feature-filter.model';


@Injectable({
  providedIn: 'root',
})
export class FeatureFilterProvider {

  constructor(private userService: AzureAdB2CService) { }

  getFilterFromConfiguration(featureFilterConfiguration: FeatureFilterConfiguration): FeatureFilterModel {
    const featureName = featureFilterConfiguration.name;
    switch (featureName) {
      case FeatureFilterTypes.TARGETING: {
        const appContext = {
          username: this.userService.getUserEmail(),
          group: this.userService.getUserGroup()
        };
        const filter = new TargetingFeatureFilterModel(featureFilterConfiguration.parameters as TargetingFilterParameters, appContext);
        return filter;
      }
      default: {
        break;
      }
    }
  }
}
