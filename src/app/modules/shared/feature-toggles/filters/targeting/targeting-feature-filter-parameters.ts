import { FeatureFilterParameters } from '../feature-filter.model';

export interface TargetingFilterParameters extends FeatureFilterParameters {
  Audience: {
    Users: string[];
    Groups: string[];
  };
}

