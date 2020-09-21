import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { AdminGuard } from './admin-guard';

describe('AdminGuard', () => {

  let adminGuard: AdminGuard;
  let azureAdB2CService: AzureAdB2CService;

  const azureAdB2CServiceStub = {
    isLogin() {
      return true;
    },
    isAdmin() {
      return true;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub },
      ]
    });
    adminGuard = TestBed.inject(AdminGuard);
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
  });

  it('should be created', () => {
    expect(adminGuard).toBeTruthy();
  });

  it('can activate the route when user is logged-in', () => {
    spyOn(azureAdB2CService, 'isAdmin').and.returnValue(true);

    const canActivate = adminGuard.canActivate();

    expect(azureAdB2CService.isAdmin).toHaveBeenCalled();
    expect(canActivate).toEqual(true);
  });

  it('can not active the route and is redirected to login if user is not logged-in', inject([Router], (router: Router) => {
    spyOn(azureAdB2CService, 'isAdmin').and.returnValue(false);
    spyOn(router, 'navigate').and.stub();

    const canActivate = adminGuard.canActivate();

    expect(azureAdB2CService.isAdmin).toHaveBeenCalled();
    expect(canActivate).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

});
