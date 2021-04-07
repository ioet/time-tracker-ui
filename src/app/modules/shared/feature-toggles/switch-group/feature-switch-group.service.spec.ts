import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FeatureManagerService } from '../feature-toggle-manager.service';
import { FeatureSwitchGroupService } from './feature-switch-group.service';

describe('FeatureSwitchGroupService', () => {
  let service: FeatureSwitchGroupService;
  let featureManagerService: FeatureManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FeatureManagerService }],
    });
    service = TestBed.inject(FeatureSwitchGroupService);
    featureManagerService = TestBed.inject(FeatureManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const params = [{ bool: false }, { bool: true }];
  params.map((param) => {
    it(`isActivated should return a boolean ${param.bool}`, () => {
      const toggleName = 'toggle_switch_test';
      // tslint:disable-next-line: no-shadowed-variable
      featureManagerService.isToggleEnabledForUser = (toggleName) => of(param.bool);

      service.isActivated().subscribe((enabled) => {
        expect(enabled).toBe(param.bool);
      });
    });
  });
});
