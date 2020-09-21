import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { FeatureFilterConfiguration } from './feature-filter-configuration';
import { FeatureFilterProvider } from './feature-filter-provider.service';
import { FeatureFilterTypes } from './feature-filter-types';
import { TargetingFeatureFilterModel } from './targeting/targeting-feature-filter.model';


describe('FeatureFilterProvider', () => {
  let fakeUserService: AzureAdB2CService;
  let service: FeatureFilterProvider;
  let featureFilterConfiguration: FeatureFilterConfiguration;

  beforeEach(() => {
    fakeUserService = new AzureAdB2CService();
    spyOn(fakeUserService, 'getUserEmail').and.returnValue('any-user-email');
    spyOn(fakeUserService, 'getUserGroup').and.returnValue('any-user-group');
    service = new FeatureFilterProvider(fakeUserService);
    featureFilterConfiguration = { name: FeatureFilterTypes.TARGETING, parameters: {} };
  });

  it('filter model type is created based on the filter configuration', () => {
    const filter = service.getFilterFromConfiguration(featureFilterConfiguration);

    expect(filter.constructor.name).toBe(TargetingFeatureFilterModel.name);
  });
});
