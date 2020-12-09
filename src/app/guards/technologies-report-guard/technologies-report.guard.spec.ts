import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { FeatureManagerService } from 'src/app/modules/shared/feature-toggles/feature-toggle-manager.service';
import { TechnologiesReportGuard } from './technologies-report.guard';

describe('TechnologiesReportGuard', () => {

  let technologiesReportGuard: TechnologiesReportGuard;
  let featureManagerService: FeatureManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    technologiesReportGuard = TestBed.inject(TechnologiesReportGuard);
    featureManagerService = TestBed.inject(FeatureManagerService);
  });

  it('should be created', () => {
    expect(technologiesReportGuard).toBeTruthy();
  });

  it('can activate the route when feature is enabled for user', () => {
    spyOn(featureManagerService, 'isToggleEnabledForUser').and.returnValue(of(true));

    const canActivate: Observable<boolean> = technologiesReportGuard.canActivate();

    expect(featureManagerService.isToggleEnabledForUser).toHaveBeenCalled();
    canActivate.subscribe(value => expect(value).toEqual(true));
  });

  it('can not active the route and is redirected to home if feature is not enabled for user', inject([Router], (router: Router) => {
    spyOn(featureManagerService, 'isToggleEnabledForUser').and.returnValue(of(false));
    spyOn(router, 'navigate').and.stub();

    const canActivate: Observable<boolean> = technologiesReportGuard.canActivate();

    expect(featureManagerService.isToggleEnabledForUser).toHaveBeenCalled();
    canActivate.subscribe(value => expect(value).toEqual(false));
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

});
