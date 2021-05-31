import { FeatureToggle } from './../../../../../environments/enum';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FeatureManagerService } from '../feature-toggle-manager.service';
import { FeatureToggleGeneralService } from './feature-toggle-general.service';
import { FeatureToggleModel } from '../feature-toggle.model';
import { TargetingFeatureFilterModel } from '../filters/targeting/targeting-feature-filter.model';


describe('FeatureToggleGeneralService', () => {
  let featureToggleGeneralService: FeatureToggleGeneralService;
  let featureManagerService: FeatureManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FeatureManagerService }],
    });
    featureToggleGeneralService = TestBed.inject(FeatureToggleGeneralService);
    featureManagerService = TestBed.inject(FeatureManagerService);
  });

  it('should be created', () => {
    expect(featureToggleGeneralService).toBeTruthy();
  });

  const params = [{ bool: false }, { bool: true }];
  params.map((param) => {
    it(`isActivated should return a boolean ${param.bool}`, () => {
      const toggleName = FeatureToggle.SWITCH_GROUP;
      // tslint:disable-next-line: no-shadowed-variable
      featureManagerService.isToggleEnabledForUser = (toggleName) => of(param.bool);

      featureToggleGeneralService.isActivated(toggleName).subscribe((enabled) => {
        expect(enabled).toBe(param.bool);
      });
    });
  });

  it('getActivated return a FeatureToggleModel', () => {
    const anyNotMatchingFilter = new TargetingFeatureFilterModel(
      { Audience: { Groups: ['a-group'], Users: ['user-a'] } },
      { username: 'user-b', group: 'b-group' }
    );
    const fakeAllFeatureaToggleWithFilters = [new FeatureToggleModel('any-other-id', true, [anyNotMatchingFilter])];
    spyOn(featureManagerService, 'getAllFeatureToggleEnableForUser').and.returnValue(of(fakeAllFeatureaToggleWithFilters));

    featureToggleGeneralService.getActivated().subscribe((featureToggleEnableForUser) => {
      expect(featureToggleEnableForUser.length).toEqual(1);
      expect(featureToggleEnableForUser).toEqual(fakeAllFeatureaToggleWithFilters);
    });
  });

  it('getActivated return empty', () => {
    const fakeAllFeatureaToggleWithFilters = [];
    spyOn(featureManagerService, 'getAllFeatureToggleEnableForUser').and.returnValue(of(fakeAllFeatureaToggleWithFilters));

    featureToggleGeneralService.getActivated().subscribe((featureToggleEnableForUser) => {
      expect(featureToggleEnableForUser.length).toEqual(0);
      expect(featureToggleEnableForUser).toEqual(fakeAllFeatureaToggleWithFilters);
    });
  });
});
