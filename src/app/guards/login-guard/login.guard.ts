import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { LoginService } from '../../modules/login/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isProduction = environment.production;
  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate() {
    if (this.isProduction) {
      if (this.azureAdB2CService.isLogin()) {
        this.azureAdB2CService.setCookies();
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    } else {
      if (this.loginService.isLogin()) {
        this.loginService.setCookies();
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
  }
}
