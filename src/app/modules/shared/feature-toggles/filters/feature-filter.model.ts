
export interface FeatureFilterModel {
  name: string;
  parameters: FeatureFilterParameters;
  appContext: FeatureFilterAppContext;
  evaluate(): boolean;

}

// tslint:disable-next-line:no-empty-interface
export interface FeatureFilterParameters { }
// tslint:disable-next-line:no-empty-interface
export interface FeatureFilterAppContext { }

