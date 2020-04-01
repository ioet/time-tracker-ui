import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AzureAdB2CService } from '../modules/login/services/azure.ad.b2c.service';
import { AzureGuardService } from './azure-guard.service';


describe('AzureGuardService', () => {
  let service: AzureGuardService;
  let azureAdB2CService: AzureAdB2CService;
  const azureAdB2CServiceStub = {
    isLogin() {
      return true;
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { providers: AzureAdB2CService, useValue: azureAdB2CServiceStub},
      ]
    });
    service = TestBed.inject(AzureGuardService);
    azureAdB2CService = TestBed.inject(AzureAdB2CService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can activate the route when user is logged-in', () => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(true);
    const canActivate = service.canActivate();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(canActivate).toEqual(true);
  });

  it('can not active the route and is redirected to login if user is not logged-in', inject([Router],  (router: Router) => {
    spyOn(azureAdB2CService, 'isLogin').and.returnValue(false);
    spyOn(router, 'navigate').and.stub();
    const canActivate = service.canActivate();
    expect(azureAdB2CService.isLogin).toHaveBeenCalled();
    expect(canActivate).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

});
