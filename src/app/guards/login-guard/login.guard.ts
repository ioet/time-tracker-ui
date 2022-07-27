import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { LoginService } from '../../modules/login/services/login.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

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
      return this.azureAdB2CService.isLogin().pipe(
        map(isLogin => {
          if (!isLogin) {
            this.router.navigate(['login']);
            return false;
          }
          this.azureAdB2CService.setCookies();
          return true;
        })
      );
    } else {
      return this.loginService.isLogin().pipe(
        map(isLogin => {
          if (!isLogin) {
            this.router.navigate(['login']);
            return false;
          }
          this.loginService.setCookies();
          return true;
        })
      );
    }
  }
}
