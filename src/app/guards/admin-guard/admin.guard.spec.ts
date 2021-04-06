import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { FeatureSwitchGroupService } from 'src/app/modules/shared/feature-toggles/switch-group/feature-switch-group.service';
import { UserInfoService } from 'src/app/modules/user/services/user-info.service';
import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;
  let azureAdB2CService: AzureAdB2CService;
  let userInfoService: UserInfoService;
  let featureSwitchGroupService: FeatureSwitchGroupService;
  const azureAdB2CServiceStub = {
    isLogin() {
      return true;
    },
    isAdmin() {
      return true;
    },
  };

  const userInfoServiceStub = {
    isAdmin: () => of(false),
  };

  const featureSwitchGroupServiceStub = {
    isActivated: () => of(false),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AzureAdB2CService, useValue: azureAdB2CServiceStub },
        { provide: UserInfoService, useValue: userInfoServiceStub },
        { provide: FeatureSwitchGroupService, useValue: featureSwitchGroupServiceStub },
      ],
    });
    adminGuard = TestBed.inject(AdminGuard);
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
    userInfoService = TestBed.inject(UserInfoService);
    featureSwitchGroupService = TestBed.inject(FeatureSwitchGroupService);
  });

  it('should be created', () => {
    expect(adminGuard).toBeTruthy();
  });

  const roleParams = [{ bool: false }, { bool: true }];
  roleParams.map((param) => {
    it(`isAdminBasedInRole return ${param.bool}`, () => {
      spyOn(azureAdB2CService, 'isAdmin').and.returnValue(param.bool);

      adminGuard.isAdminBasedInRole().subscribe((enabled) => {
        expect(azureAdB2CService.isAdmin).toHaveBeenCalled();
        expect(enabled).toBe(param.bool);
      });
    });
  });

  const groupParams = [{ bool: false }, { bool: true }];
  groupParams.map((param) => {
    it(`isAdminBasedInGroup return ${param.bool}`, () => {
      spyOn(userInfoService, 'isAdmin').and.returnValue(of(param.bool));

      adminGuard.isAdminBasedInGroup().subscribe((enabled) => {
        expect(userInfoService.isAdmin).toHaveBeenCalled();
        expect(enabled).toBe(param.bool);
      });
    });
  });

  const switchToggleParams = [
    { switchGroup: false, chosen: 'isAdminBasedInRole', isAdmin: true },
    { switchGroup: true, chosen: 'isAdminBasedInGroup', isAdmin: false },
  ];
  switchToggleParams.map((param) => {
    it(`on switchGroup ${param.switchGroup}, ${param.chosen} should be chosen`, () => {
      const switchGroup$ = of(param.switchGroup);

      spyOn(featureSwitchGroupService, 'isActivated').and.returnValue(switchGroup$);

      const canActivate = adminGuard.canActivate();

      featureSwitchGroupService.isActivated().pipe(take(1));

      canActivate.subscribe((enabled) => {
        expect(featureSwitchGroupService.isActivated).toHaveBeenCalled();
        expect(enabled).toBe(param.isAdmin);
      });
    });
  });

  const navigateParams = [
    { switchGroup: false, chosen: 'activate the route', isAdmin: true },
    { switchGroup: false, chosen: 'redirect to /login', isAdmin: false },
    { switchGroup: true, chosen: 'activate the route', isAdmin: true },
    { switchGroup: true, chosen: 'redirect to /login', isAdmin: false },
  ];
  navigateParams.map((param) => {
    it(`on isAdmin: ${param.isAdmin} with toggleSwitch: ${param.switchGroup}, should ${param.chosen} `, inject(
      [Router],
      (router: Router) => {
        const switchGroup$ = of(param.switchGroup);
        const isAdmin$ = of(param.isAdmin);

        spyOn(featureSwitchGroupService, 'isActivated').and.returnValue(switchGroup$);
        spyOn(adminGuard, 'isAdminBasedInRole').and.returnValue(isAdmin$);
        spyOn(adminGuard, 'isAdminBasedInGroup').and.returnValue(isAdmin$);
        spyOn(router, 'navigate').and.stub();

        const canActivate = adminGuard.canActivate();

        canActivate.subscribe((enabled) => {
          expect(featureSwitchGroupService.isActivated).toHaveBeenCalled();
          if (!enabled) {
            expect(router.navigate).toHaveBeenCalledWith(['login']);
          } else {
            expect(router.navigate).not.toHaveBeenCalled();
            expect(enabled).toBeTrue();
          }
        });
      }
    ));
  });
});
