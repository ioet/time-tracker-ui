import { AppConfigurationClient, ConfigurationSetting, GetConfigurationSettingResponse } from '@azure/app-configuration';
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
      client_filters: [{ name: 'any-name', parameters: {} }],
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
      status: 200,
    },
    statusCode: 200,
    value: JSON.stringify(anyToggleResponse),
  };
  const fakeFeatureFilterModelUserName = 'fakeuser@ioet.com';
  const fakeFeatureFilterModelGroup = 'fake-group';
  const fakeFeatureFilterModel = new TargetingFeatureFilterModel (
    { Audience: { Groups: ['a-group'], Users: ['any-user'] } },
    { username: fakeFeatureFilterModelUserName, group: fakeFeatureFilterModelGroup }
  );

  let fakeGetConfigurationSetting;

  let fakeAppConfigurationClient: any;
  let fakeFeatureFilterProvider: FeatureFilterProvider;
  let service: FeatureToggleProvider;


  beforeEach(() => {
    fakeAppConfigurationClient = new AppConfigurationClient(fakeAppConfigurationConnectionString);
    const fakeAzureAdB2CService = {
      getUserEmail(){
        return fakeFeatureFilterModelUserName;
      },
      getUserGroup(){
        return fakeFeatureFilterModelGroup;
      }
    };
    fakeFeatureFilterProvider = new FeatureFilterProvider(fakeAzureAdB2CService as AzureAdB2CService);
    service = new FeatureToggleProvider(fakeAppConfigurationClient, fakeFeatureFilterProvider);

    fakeGetConfigurationSetting = spyOn(fakeAppConfigurationClient, 'getConfigurationSetting').and.callFake(() =>
        of(fakeResponse).toPromise()
      );
  });

  it('toggles are read using azure configuration client', async () => {
    service.getFeatureToggle(featureToggleKey, featureToggleLabel).subscribe((value) => {
      expect(fakeGetConfigurationSetting).toHaveBeenCalledWith({
        key: `.appconfig.featureflag/${featureToggleKey}`,
        label: featureToggleLabel,
      });
    });
  });

  it('filters are built using the filterProvider', async () => {
    const getFilterConfigurationSpy = spyOn(fakeFeatureFilterProvider, 'getFilterFromConfiguration').and.returnValue(
      fakeFeatureFilterModel
    );

    service.getFeatureToggle(featureToggleKey, featureToggleLabel).subscribe((value) => {
      expect(getFilterConfigurationSpy).toHaveBeenCalled();
    });
  });

  it('toggle model is built', async () => {
    spyOn(fakeFeatureFilterProvider, 'getFilterFromConfiguration').and.returnValue(
      fakeFeatureFilterModel
    );

    service.getFeatureToggle(featureToggleKey, featureToggleLabel).subscribe((value) => {
      expect(value).toEqual(new FeatureToggleModel(anyToggleResponse.id, anyToggleResponse.enabled, [fakeFeatureFilterModel]));
    });
  });

  it('Call listConfigurationSettings when we called getAllFeatureToggle()', () => {
    const fakeKeyFilter = { keyFilter: '.appconfig.featureflag/*' };
    spyOn(fakeAppConfigurationClient, 'listConfigurationSettings');

    service.getAllFeatureToggle();

    expect(fakeAppConfigurationClient.listConfigurationSettings).toHaveBeenCalledWith(fakeKeyFilter);
  });

  it('Call listConfigurationSettings with bad keyFilter when we called getAllFeatureToggle()', () => {
    const badFakeKeyFilter = { keyFilter: 'abc' };
    spyOn(fakeAppConfigurationClient, 'listConfigurationSettings').withArgs(badFakeKeyFilter);

    const response = service.getAllFeatureToggle();

    response.then((arrayFeatureToggle) => {
      expect(arrayFeatureToggle).toEqual([]);
    });
  });

  it('Get empty array when we called getAllFeatureToggle() and listConfigurationSettings returns an empty object', () => {
    spyOn(fakeAppConfigurationClient, 'listConfigurationSettings').and.returnValue([]);

    const response = service.getAllFeatureToggle();

    response.then((arrayFeatureToggle) => {
      expect(arrayFeatureToggle).toEqual([]);
    });
  });

  it('Get empty Promise<FeatureToggleModel[]> when we called getAllFeatureToggle() an raise error', () => {
    spyOn(fakeAppConfigurationClient, 'listConfigurationSettings').and.returnValue(3);

    const response: Promise<FeatureToggleModel[]> = service.getAllFeatureToggle();
    response.then((arrayFeatureToggle) => {
      expect(arrayFeatureToggle).toEqual([]);
    });
  });

  it('Get array when we called getAllFeatureToggle() and listConfigurationSettings returns an object', () => {
    const fakeConfigurationSetting: ConfigurationSetting = {
      key: '.appconfig.featureflag/test',
      isReadOnly: false,
      value:
        '{"id":"test","description":"Exponential growth in Time clock and Time entries, in the UI","enabled":true,"conditions":{"client_filters":[{"name":"Microsoft.Targeting","parameters":{"Audience":{"Users":["any-user"],"Groups":["a-group"]}}}]}}',
    };
    const fakeFeatureToggleModel = new FeatureToggleModel('test', true, [fakeFeatureFilterModel]);
    spyOn(fakeAppConfigurationClient, 'listConfigurationSettings').and.returnValue([fakeConfigurationSetting]);
    spyOn(fakeFeatureFilterProvider, 'getFilterFromConfiguration').and.returnValue(fakeFeatureFilterModel);

    const response = service.getAllFeatureToggle();

    response.then((result) => {
      expect(result.length).toEqual(1);
      expect(result).toEqual([fakeFeatureToggleModel]);
    });

  });
});
