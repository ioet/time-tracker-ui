import { AppConfigurationClient, GetConfigurationSettingResponse } from '@azure/app-configuration';
import { of } from 'rxjs';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { FeatureToggleConfiguration } from './feature-toggle-configuration';
import { FeatureToggleProvider } from './feature-toggle-provider.service';
import { FeatureToggleModel } from './feature-toggle.model';
import { FeatureFilterProvider } from './filters/feature-filter-provider.service';
import { TargetingFeatureFilterModel } from './filters/targeting/targeting-feature-filter.model';


describe('FeatureToggleProvider', () => {
  const anyToggleResponse: FeatureToggleConfiguration = {
    id: '1',
    enabled: true,
    description: 'any description',
    conditions: {
      client_filters: [{ name: 'any-name', parameters: {} }]
    },
  };

  const fakeAppConfigurationConnectionString = 'Endpoint=http://fake.foo;Id=fake.id;Secret=fake.secret';
  const featureToggleKey = 'foo';
  const featureToggleLabel = 'dev';
  const fakeResponse: GetConfigurationSettingResponse = {
    isReadOnly: true,
    key: featureToggleKey,
    _response: {
      request: null,
      bodyAsText: 'any-response',
      headers: null,
      parsedHeaders: null,
      status: 200
    },
    statusCode: 200,
    value: JSON.stringify(anyToggleResponse)
  };
  const anyFilter = new TargetingFeatureFilterModel(
    { Audience: { Groups: ['a-group'], Users: ['any-user'] } },
    { username: 'fakeuser@ioet.com', group: 'fake-group' }
  );
  let fakeConfigurationClient;
  let fakeGetConfigurationSetting;
  let fakeFeatureFilterProvider;
  let getFilterConfigurationSpy;
  let service;



  beforeEach(() => {
    fakeConfigurationClient = new AppConfigurationClient(fakeAppConfigurationConnectionString);
    fakeGetConfigurationSetting = spyOn(fakeConfigurationClient, 'getConfigurationSetting').and.callFake(
      () => of(fakeResponse).toPromise());

    fakeFeatureFilterProvider = new FeatureFilterProvider(new AzureAdB2CService());
    getFilterConfigurationSpy = spyOn(fakeFeatureFilterProvider, 'getFilterFromConfiguration').and.
      returnValue(anyFilter);
    service = new FeatureToggleProvider(fakeConfigurationClient, fakeFeatureFilterProvider);
  });

  it('toggles are read using azure configuration client', async () => {
    service.getFeatureToggle(featureToggleKey, featureToggleLabel).subscribe((value) => {

      expect(fakeGetConfigurationSetting).toHaveBeenCalledWith(
        { key: `.appconfig.featureflag/${featureToggleKey}`, label: featureToggleLabel }
      );
    });
  });

  it('filters are built using the filterProvider', async () => {
    service.getFeatureToggle(featureToggleKey, featureToggleLabel).subscribe((value) => {
      expect(getFilterConfigurationSpy).toHaveBeenCalled();
    });
  });

  it('toggle model is built', async () => {
    service.getFeatureToggle(featureToggleKey, featureToggleLabel).subscribe((value) => {
      expect(value).toEqual(new FeatureToggleModel(anyToggleResponse.id, anyToggleResponse.enabled, [anyFilter]));
    });
  });
});
