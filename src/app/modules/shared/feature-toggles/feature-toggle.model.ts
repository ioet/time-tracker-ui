import { FeatureFilterModel } from './filters/feature-filter.model';

export class FeatureToggleModel {
  constructor(
    public readonly name: string,
    public readonly enabled: boolean,
    public readonly filters: FeatureFilterModel[]
  ) { }
}
