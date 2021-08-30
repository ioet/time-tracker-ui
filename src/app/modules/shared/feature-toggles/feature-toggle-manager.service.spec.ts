import { AppConfigurationClient } from '@azure/app-configuration';
import { of } from 'rxjs';
import { AzureAdB2CService } from '../../login/services/azure.ad.b2c.service';
import { FeatureManagerService } from './feature-toggle-manager.service';
import { FeatureToggleProvider } from './feature-toggle-provider.service';
import { FeatureToggleModel } from './feature-toggle.model';
import { FeatureFilterProvider } from './filters/feature-filter-provider.service';
import { TargetingFeatureFilterModel } from './filters/targeting/targeting-feature-filter.model';


describe('FeatureToggleManager', () => {
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

    beforeEach(() => {
      aToggleWithFilters = new FeatureToggleModel('any-other-id', true, [anyMatchingFilter]);
      fakeFeatureToggleProvider = new FeatureToggleProvider(
        new AppConfigurationClient(fakeAppConfigurationConnectionString),
        new FeatureFilterProvider(new AzureAdB2CService())
      );
      service = new FeatureManagerService(fakeFeatureToggleProvider);
    });

    it('given a feature toggle with filters which do not match the verification, then the response is false', async () => {

      aToggleWithFilters = new FeatureToggleModel('any-other-id', true, [anyNotMatchingFilter]);
      fakeFeatureToggleProvider = new FeatureToggleProvider(
        new AppConfigurationClient(fakeAppConfigurationConnectionString),
        new FeatureFilterProvider(new AzureAdB2CService())
      );
      spyOn(fakeFeatureToggleProvider, 'getFeatureToggle').and.returnValue(of(aToggleWithFilters));
      service = new FeatureManagerService(fakeFeatureToggleProvider);

    });

    it('Get empty when getAllFeatureToggle() return empty', () => {
      const fakeAllFeatureaToggleWithFilters = [];
      spyOn(fakeFeatureToggleProvider, 'getAllFeatureToggle').and.returnValue(Promise.resolve(fakeAllFeatureaToggleWithFilters));

      const response = service.getAllFeatureToggleEnableForUser();

      response.subscribe((result) => {
        expect(result.length).toEqual(0);
        expect(result).toEqual([]);
      });
      expect().nothing();
    });

    it('Get empty when getAllFeatureToggle() return FeatureToggle without fakeuser', () => {
      const fakeAllFeatureaToggleWithFilters = [new FeatureToggleModel('any-other-id', true, [anyNotMatchingFilter])];
      spyOn(fakeFeatureToggleProvider, 'getAllFeatureToggle').and.returnValue(Promise.resolve(fakeAllFeatureaToggleWithFilters));

      const response = service.getAllFeatureToggleEnableForUser();

      response.subscribe((result) => {
        expect(result.length).toEqual(0);
        expect(result).toEqual([]);
      });
      expect().nothing();
    });

    it('Get FeatureToggleModel[] when getAllFeatureToggle() return FeatureToggle with fakeuser', () => {
      const fakeFeatureToggleModel: FeatureToggleModel = new FeatureToggleModel('good-other-id', false, [anyMatchingFilter]);
      const fakeAllFeatureaToggleWithFilters = [
        new FeatureToggleModel('any-other-id', true, [anyNotMatchingFilter]),
        fakeFeatureToggleModel
      ];
      spyOn(fakeFeatureToggleProvider, 'getAllFeatureToggle').and.returnValue(Promise.resolve(fakeAllFeatureaToggleWithFilters));

      const response = service.getAllFeatureToggleEnableForUser();

      response.subscribe((result) => {
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(fakeFeatureToggleModel);
      });
      expect().nothing();
    });
  });
});
