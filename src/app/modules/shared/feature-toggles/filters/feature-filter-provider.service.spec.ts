import { AzureAdB2CService } from 'src/app/modules/login/services/azure.ad.b2c.service';
import { FeatureFilterConfiguration } from './feature-filter-configuration';
import { FeatureFilterProvider } from './feature-filter-provider.service';
import { FeatureFilterTypes } from './feature-filter-types';
import { TargetingFeatureFilterModel } from './targeting/targeting-feature-filter.model';
import { LoginService } from '../../../login/services/login.service';


describe('FeatureFilterProvider', () => {
  let fakeUserService: AzureAdB2CService;
  let service: FeatureFilterProvider;
  let featureFilterConfiguration: FeatureFilterConfiguration;
  let fakeLoginService: LoginService;

  beforeEach(() => {
    fakeUserService = new AzureAdB2CService();
    fakeLoginService = new LoginService();
    spyOn(fakeUserService, 'getUserEmail').and.returnValue('any-user-email');
    spyOn(fakeUserService, 'getUserGroup').and.returnValue('any-user-group');
    spyOn(fakeLoginService, 'getUserEmail').and.returnValue('any-user-email');
    spyOn(fakeLoginService, 'getUserGroup').and.returnValue('any-user-group');
    service = new FeatureFilterProvider(fakeUserService, fakeLoginService);
    featureFilterConfiguration = { name: FeatureFilterTypes.TARGETING, parameters: {} };
  });

  it('filter model type is created based on the filter configuration', () => {
    service.isProduction = true;
    const filter = service.getFilterFromConfiguration(featureFilterConfiguration);

    expect(filter.constructor.name).toBe(TargetingFeatureFilterModel.name);
  });

  it('filter model type is created based on the filter configuration Locally', () => {
    service.isProduction = false;
    const filter = service.getFilterFromConfiguration(featureFilterConfiguration);

    expect(filter.constructor.name).toBe(TargetingFeatureFilterModel.name);
  });
});
