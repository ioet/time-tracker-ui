import { AppConfigurationClient, GetConfigurationSettingResponse } from '@azure/app-configuration';
import { of } from 'rxjs';
import { FeatureTogglesService } from './feature-toggles.service';


describe('FeatureTogglesService', () => {
  const anyToggle = {
    id: '1',
    enabled: true,
    description: 'any description',
    conditions: null,
  };

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
    value: JSON.stringify(anyToggle)
  };

  let fakeGetConfigurationSetting;
  const fakeAppConfigurationConnectionString = 'Endpoint=http://fake.foo;Id=fake.id;Secret=fake.secret';
  let fakeAppConfigurationClient: any;
  let service: FeatureTogglesService;

  beforeEach(() => {
    fakeAppConfigurationClient = new AppConfigurationClient(fakeAppConfigurationConnectionString);
    service = new FeatureTogglesService(fakeAppConfigurationClient);
    fakeGetConfigurationSetting = spyOn(fakeAppConfigurationClient, 'getConfigurationSetting').and.callFake(
      () => of(fakeResponse).toPromise());
  });

  it('toggles are read using azure configuration client', async () => {
    service.getToggle(featureToggleKey, featureToggleLabel).subscribe((value) => {
      expect(fakeGetConfigurationSetting).toHaveBeenCalledWith(
        { key: `.appconfig.featureflag/${featureToggleKey}`, label: featureToggleLabel }
      );
      expect(value).toEqual(anyToggle);
    });
  });

});
