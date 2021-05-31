import { Inject, Injectable, InjectionToken } from '@angular/core';
import { AppConfigurationClient } from '@azure/app-configuration';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AZURE_APP_CONFIGURATION_CONNECTION_STRING } from 'src/environments/environment';
import { FeatureToggleConfiguration } from './feature-toggle-configuration';
import { FeatureToggleModel } from './feature-toggle.model';
import { FeatureFilterProvider } from './filters/feature-filter-provider.service';

const APP_CONFIGURATION_CLIENT = new InjectionToken<AppConfigurationClient>('Azure configuration client', {
  providedIn: 'root',
  factory: () => new AppConfigurationClient(AZURE_APP_CONFIGURATION_CONNECTION_STRING),
});
@Injectable({
  providedIn: 'root',
})
export class FeatureToggleProvider {
  constructor(
    @Inject(APP_CONFIGURATION_CLIENT)
    private client: AppConfigurationClient,
    private featureFilterProvider: FeatureFilterProvider
  ) {}

  public getFeatureToggle(toggleName: string, toggleLabel?: string): Observable<FeatureToggleModel> {
    return from(
      this.client.getConfigurationSetting({ key: `.appconfig.featureflag/${toggleName}`, label: toggleLabel })
    ).pipe(
      map((featureToggleResponse) => JSON.parse(featureToggleResponse.value) as FeatureToggleConfiguration),
      map((featureToggleConfiguration) => {
        const filters = featureToggleConfiguration.conditions.client_filters.map((filterConfiguration) =>
          this.featureFilterProvider.getFilterFromConfiguration(filterConfiguration)
        );
        return new FeatureToggleModel(featureToggleConfiguration.id, featureToggleConfiguration.enabled, filters);
      })
    );
  }

  public async getAllFeatureToggle(): Promise<FeatureToggleModel[]> {
    const listFeatureToggleModel: FeatureToggleModel[] = [];
    const allFeatureToggle = this.client.listConfigurationSettings({ keyFilter: '.appconfig.featureflag/*' });
    try {
      for await (const featureToggle of allFeatureToggle) {
        const featureToggleConfiguration = JSON.parse(featureToggle.value) as FeatureToggleConfiguration;
        const filters = featureToggleConfiguration.conditions.client_filters.map((filterConfiguration) => {
          return this.featureFilterProvider.getFilterFromConfiguration(filterConfiguration);
        });
        const featureToggleModel = new FeatureToggleModel(
          featureToggleConfiguration.id,
          featureToggleConfiguration.enabled,
          filters
        );
        listFeatureToggleModel.push(featureToggleModel);
      }
      return listFeatureToggleModel;
    } catch (errorResponseAzure) {
      return listFeatureToggleModel;
    }
  }
}
