import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AzureAdB2CService } from '../../modules/login/services/azure.ad.b2c.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private azureAdB2CService: AzureAdB2CService, private router: Router, private cookieService: CookieService) { }

  canActivate() {
    if (this.azureAdB2CService.isLogin() && this.cookieService.check('msal.idtoken')) {
        this.azureAdB2CService.setCookies();
        return true;
    } else {
        this.router.navigate(['login']);
        return false;
    }
  }
}
