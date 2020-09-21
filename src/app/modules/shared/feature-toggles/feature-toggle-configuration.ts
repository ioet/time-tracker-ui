import { FeatureFilterConfiguration } from './filters/feature-filter-configuration';

export interface FeatureToggleConfiguration {
  id: string;
  enabled: boolean;
  description: string;
  conditions: {
    client_filters: FeatureFilterConfiguration[];
  };
}
