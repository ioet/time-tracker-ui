import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserInfoService } from 'src/app/modules/user/services/user-info.service';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;
  let userInfoService: UserInfoService;

  const userInfoServiceStub = {
    isAdmin: () => of(false),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: UserInfoService, useValue: userInfoServiceStub },
      ],
    });
    adminGuard = TestBed.inject(AdminGuard);
    userInfoService = TestBed.inject(UserInfoService);
  });

  it('should be created', () => {
    expect(adminGuard).toBeTruthy();
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

  const navigateParams = [
    { chosen: 'activate the route', isAdmin: true },
    { chosen: 'redirect to /login', isAdmin: false }
  ];
  navigateParams.map((param) => {
    it(`on isAdmin: ${param.isAdmin}, should ${param.chosen} `, inject(
      [Router],
      (router: Router) => {
        const isAdmin$ = of(param.isAdmin);

        spyOn(adminGuard, 'isAdminBasedInGroup').and.returnValue(isAdmin$);
        spyOn(router, 'navigate').and.stub();

        const canActivate = adminGuard.canActivate();

        canActivate.subscribe((enabled) => {
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
