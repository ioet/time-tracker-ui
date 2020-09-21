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

  it('toggles are read using azure configuration client', async () => {
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
      value: JSON.stringify(anyToggle)
    };
    const fakeConfigurationClient = new AppConfigurationClient(fakeAppConfigurationConnectionString);
    const fakeGetConfigurationSetting = spyOn(fakeConfigurationClient, 'getConfigurationSetting').and.callFake(
      () => of(fakeResponse).toPromise());

    const service = new FeatureTogglesService(fakeConfigurationClient);

    service.getToggle(featureToggleKey, featureToggleLabel).subscribe((value) => {
      expect(fakeGetConfigurationSetting).toHaveBeenCalledWith(
        { key: `.appconfig.featureflag/${featureToggleKey}`, label: featureToggleLabel }
      );
      expect(value).toEqual(anyToggle);
    });
  });
});
