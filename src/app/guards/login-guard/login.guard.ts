import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { LoginService } from '../../modules/login/services/login.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { EnvironmentType } from 'src/environments/enum';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isProduction = environment.production === EnvironmentType.TT_PROD_LEGACY;
  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate() {
    if (this.isProduction) {
      if (this.azureAdB2CService.isLogin()) {
        this.azureAdB2CService.setCookies();
        return of(true);
      } else {
        this.router.navigate(['login']);
        return of(false);
      }
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
