import { Inject, Injectable, InjectionToken } from '@angular/core';
import { AppConfigurationClient } from '@azure/app-configuration';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AZURE_APP_CONFIGURATION_CONNECTION_STRING } from 'src/environments/environment';
import { FeatureToggle } from './toggle.model';


const APP_CONFIGURATION_CLIENT = new InjectionToken<AppConfigurationClient>('Azure configuration client', {
  providedIn: 'root',
  factory: () => new AppConfigurationClient(AZURE_APP_CONFIGURATION_CONNECTION_STRING)
});
@Injectable({
  providedIn: 'root',

})
export class FeatureTogglesService {
  constructor(
    @Inject(APP_CONFIGURATION_CLIENT)
    private client: AppConfigurationClient
  ) { }

  public getToggle(toggleName: string, toggleLabel?: string): Observable<FeatureToggle> {
    return from(this.client.getConfigurationSetting({ key: `.appconfig.featureflag/${toggleName}`, label: toggleLabel })).pipe(
      map(configurationSettingsResponse => JSON.parse(configurationSettingsResponse.value))
    );
  }
}
