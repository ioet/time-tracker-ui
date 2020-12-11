import { AppConfigurationClient } from '@azure/app-configuration';
import { of } from 'rxjs';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { FeatureManagerService } from './feature-toggle-manager.service';
import { FeatureToggleProvider } from './feature-toggle-provider.service';
import { FeatureToggleModel } from './feature-toggle.model';
import { FeatureFilterProvider } from './filters/feature-filter-provider.service';
import { TargetingFeatureFilterModel } from './filters/targeting/targeting-feature-filter.model';


describe('FeatureToggleManager', () => {
  const featureToggleKey = 'foo';
  const featureToggleLabel = 'dev';
  const fakeAppConfigurationConnectionString = 'Endpoint=http://fake.foo;Id=fake.id;Secret=fake.secret';
  const aFeatureToggle = new FeatureToggleModel('any-id', true, []);
  let service: FeatureManagerService;
  let fakeFeatureToggleProvider;

  describe('Features without filters', () => {
    beforeEach(() => {

      fakeFeatureToggleProvider = new FeatureToggleProvider(
        new AppConfigurationClient(fakeAppConfigurationConnectionString),
        new FeatureFilterProvider(new AzureAdB2CService())
      );
      spyOn(fakeFeatureToggleProvider, 'getFeatureToggle').and.returnValue(of(aFeatureToggle));
      service = new FeatureManagerService(fakeFeatureToggleProvider);
    });
    it('manager uses feature provider to build feature toggle model', async () => {
      service.isToggleEnabled(featureToggleKey, featureToggleLabel).subscribe((value) => {

        expect(fakeFeatureToggleProvider).toHaveBeenCalledWith(featureToggleKey, featureToggleLabel);
      });
    });

    it('manager extracts enabled attribute from feature toggle model', async () => {
      service.isToggleEnabled(featureToggleKey, featureToggleLabel).subscribe((value) => {
        expect(value).toEqual(aFeatureToggle.enabled);
      });
    });
  });


  describe('Features with filters', () => {
    const anyMatchingFilter = new TargetingFeatureFilterModel(
      { Audience: { Groups: ['group-a'], Users: ['user-a'] } },
      { username: 'user-b', group: 'group-a' }
    );
    const anyNotMatchingFilter = new TargetingFeatureFilterModel(
      { Audience: { Groups: ['a-group'], Users: ['user-a'] } },
      { username: 'user-b', group: 'b-group' }
    );

    let aToggleWithFilters;
    let getFeatureToggleSpy;

    beforeEach(() => {
      aToggleWithFilters = new FeatureToggleModel('any-other-id', true, [anyMatchingFilter]);
      fakeFeatureToggleProvider = new FeatureToggleProvider(
        new AppConfigurationClient(fakeAppConfigurationConnectionString),
        new FeatureFilterProvider(new AzureAdB2CService())
      );
      getFeatureToggleSpy = spyOn(fakeFeatureToggleProvider, 'getFeatureToggle').and.returnValue(of(aToggleWithFilters));
      service = new FeatureManagerService(fakeFeatureToggleProvider);
      spyOn(service, 'isToggleEnabled').and.returnValue(of(true));
    });

    it('manager uses feature provider to build feature toggle model', async () => {
      service.isToggleEnabledForUser(featureToggleKey, featureToggleLabel).subscribe((value) => {
        expect(getFeatureToggleSpy).toHaveBeenCalledWith(featureToggleKey, featureToggleLabel);
      });
    });

    it('given a feature toggle with filters which match the verification, then the response is true', async () => {
      service.isToggleEnabledForUser(featureToggleKey, featureToggleLabel).subscribe((value) => {
        expect(value).toEqual(true);
      });
    });

    it('given a feature toggle with filters which do not match the verification, then the response is false', async () => {

      aToggleWithFilters = new FeatureToggleModel('any-other-id', true, [anyNotMatchingFilter]);
      fakeFeatureToggleProvider = new FeatureToggleProvider(
        new AppConfigurationClient(fakeAppConfigurationConnectionString),
        new FeatureFilterProvider(new AzureAdB2CService())
      );
      spyOn(fakeFeatureToggleProvider, 'getFeatureToggle').and.returnValue(of(aToggleWithFilters));
      service = new FeatureManagerService(fakeFeatureToggleProvider);

      service.isToggleEnabledForUser(featureToggleKey, featureToggleLabel).subscribe((value) => {
        expect(value).toEqual(false);
      });
    });
  });
});
