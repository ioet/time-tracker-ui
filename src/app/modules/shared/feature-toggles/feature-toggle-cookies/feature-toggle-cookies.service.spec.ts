import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { FeatureToggleGeneralService } from '../feature-toggle-general/feature-toggle-general.service';
import { FeatureToggleModel } from '../feature-toggle.model';
import { TargetingFeatureFilterModel } from '../filters/targeting/targeting-feature-filter.model';
import { FeatureToggleCookiesService } from './feature-toggle-cookies.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('FeatureToggleCookiesService', () => {
  let cookieService: CookieService;
  let featureToggleGeneralService: FeatureToggleGeneralService;
  let service: FeatureToggleCookiesService;
  let router: Router;

  const socialAuthServiceStub = jasmine.createSpyObj('SocialAuthService', ['authState']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [CookieService, FeatureToggleGeneralService,
        { provide: SocialAuthService, useValue: socialAuthServiceStub }
      ]
    });
    cookieService = TestBed.inject(CookieService);
    featureToggleGeneralService = TestBed.inject(FeatureToggleGeneralService);
    service = TestBed.inject(FeatureToggleCookiesService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('not call CookieService.set() when call setCookies() and getActivated() return empty', () => {
    const fakeAllFeatureaToggleWithFilters = [];
    const spyOnSetCookie = spyOn(cookieService, 'set');
    spyOn(featureToggleGeneralService, 'getActivated').and.returnValue(of(fakeAllFeatureaToggleWithFilters));

    service.setCookies();

    expect(spyOnSetCookie).toHaveBeenCalledTimes(0);
  });

  it('Call 1 time CookieService.set() when call setCookies()', () => {
    const anyMatchingFilter = new TargetingFeatureFilterModel(
      { Audience: { Groups: ['group-a'], Users: ['user-a'] } },
      { username: 'user-b', group: 'group-a' }
    );
    const fakeAllFeatureaToggleWithFilters = [new FeatureToggleModel('any-other-id', true, [anyMatchingFilter])];
    const spyOnSetCookie = spyOn(cookieService, 'set');
    spyOn(featureToggleGeneralService, 'getActivated').and.returnValue(of(fakeAllFeatureaToggleWithFilters));

    service.setCookies();

    expect(spyOnSetCookie).toHaveBeenCalledTimes(1);
  });

  it('Call 2 times CookieService.set() when call setCookies()', () => {
    const anyMatchingFilter = new TargetingFeatureFilterModel(
      { Audience: { Groups: ['group-a'], Users: ['user-a'] } },
      { username: 'user-b', group: 'group-a' }
    );
    const fakeAllFeatureaToggleWithFilters = [
      new FeatureToggleModel('first-id', true, [anyMatchingFilter]),
      new FeatureToggleModel('second-id', true, [anyMatchingFilter])
    ];
    const spyOnSetCookie = spyOn(cookieService, 'set');
    spyOn(featureToggleGeneralService, 'getActivated').and.returnValue(of(fakeAllFeatureaToggleWithFilters));

    service.setCookies();

    expect(spyOnSetCookie).toHaveBeenCalledTimes(2);
  });
});
