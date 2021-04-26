import { FeatureToggle } from './../../../../../environments/enum';
import { TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { FeatureManagerService } from '../feature-toggle-manager.service';
import { FeatureToggleGeneralService } from './feature-toggle-general.service';


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
});
