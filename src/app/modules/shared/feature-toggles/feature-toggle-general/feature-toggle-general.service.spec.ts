import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FeatureManagerService } from '../feature-toggle-manager.service';
import { FeatureToggleGeneralService } from './feature-toggle-general.service';
import { FeatureToggleModel } from '../feature-toggle.model';
import { TargetingFeatureFilterModel } from '../filters/targeting/targeting-feature-filter.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialAuthService } from 'angularx-social-login';


// since the backend is not in Azure, this module is not used
xdescribe('FeatureToggleGeneralService', () => {
  let featureToggleGeneralService: FeatureToggleGeneralService;
  let featureManagerService: FeatureManagerService;

  const socialAuthServiceStub = jasmine.createSpyObj('SocialAuthService', ['authState']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: FeatureManagerService },
        { provide: SocialAuthService, useValue: socialAuthServiceStub }
      ],
    });
    featureToggleGeneralService = TestBed.inject(FeatureToggleGeneralService);
    featureManagerService = TestBed.inject(FeatureManagerService);
  });

  it('should be created', () => {
    expect(featureToggleGeneralService).toBeTruthy();
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
