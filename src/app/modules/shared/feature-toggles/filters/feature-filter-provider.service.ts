import { Injectable } from '@angular/core';
import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { FeatureFilterConfiguration } from './feature-filter-configuration';
import { FeatureFilterTypes } from './feature-filter-types';
import { FeatureFilterModel } from './feature-filter.model';
import { TargetingFilterParameters } from './targeting/targeting-feature-filter-parameters';
import { TargetingFeatureFilterModel } from './targeting/targeting-feature-filter.model';
import { LoginService } from '../../../login/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureFilterProvider {
  constructor(private userService: AzureAdB2CService, private loginService: LoginService) {}
  isProduction = environment.production;

  getFilterFromConfiguration(featureFilterConfiguration: FeatureFilterConfiguration): FeatureFilterModel {
    const featureName = featureFilterConfiguration.name;
    switch (featureName) {
      case FeatureFilterTypes.TARGETING: {
        let username: string;
        let group: string;
        if (this.userService) {
          try {
            if (this.isProduction) {
              username = this.userService.getUserEmail();
              group = this.userService.getUserGroup();
            }else{
              username = this.loginService.getUserEmail();
              group = this.loginService.getUserGroup();
            }
          } catch (error) {
            username = 'fakeuser@ioet.com';
            group = 'fake-group';
          }
        }

        const appContext = {
          username,
          group,
        };
        const filter = new TargetingFeatureFilterModel(
          featureFilterConfiguration.parameters as TargetingFilterParameters,
          appContext
        );
        return filter;
      }
      default: {
        break;
      }
    }
  }
}
