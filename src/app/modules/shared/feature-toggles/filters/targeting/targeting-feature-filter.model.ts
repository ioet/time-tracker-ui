import { FeatureFilterTypes } from '../feature-filter-types';
import { FeatureFilterModel } from '../feature-filter.model';
import { TargetingFilterParameters } from './targeting-feature-filter-parameters';
import { TargetingFilterAppContext } from './targeting-filter-app-context';

export class TargetingFeatureFilterModel implements FeatureFilterModel {

  name = FeatureFilterTypes.TARGETING;
  constructor(public readonly parameters: TargetingFilterParameters, public readonly appContext: TargetingFilterAppContext) {
  }

  evaluate(): boolean {
    const userCoincidence = this.parameters.Audience.Users.includes(this.appContext.username);
    const groupCoincidence = this.parameters.Audience.Groups.includes(this.appContext.group);
    return userCoincidence || groupCoincidence;
  }
}


