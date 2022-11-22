import { Component, OnInit, NgZone } from '@angular/core';
import { AzureAdB2CService } from './services/azure.ad.b2c.service';
import { Router } from '@angular/router';
import { FeatureToggleCookiesService } from '../shared/feature-toggles/feature-toggle-cookies/feature-toggle-cookies.service';

import { environment, CLIENT_URL } from 'src/environments/environment';
import { EnvironmentType } from 'src/environments/enum';
import { LoginService } from './services/login.service';
import { UserService } from '../user/services/user.service';

declare global {
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isProduction = environment.production === EnvironmentType.TT_PROD_LEGACY;
  cliendId = CLIENT_URL;
  authUrl = environment.authUrl;
  authAppName = environment.authAppName;
  auth2: any;


  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private featureToggleCookiesService: FeatureToggleCookiesService,
    private loginService?: LoginService,
    private userService?: UserService,
    private ngZone?: NgZone
  ) {}

  ngOnInit() {
    if (!this.isProduction) {
      this.loginService.isLogin().subscribe((isLogged) => {
        if (isLogged){
          this.loginService.getUser(null).subscribe((resp) => {
          this.loginService.setCookies();
          const tokenObject = JSON.stringify(resp);
          const tokenJson = JSON.parse(tokenObject);
          this.loginService.setLocalStorage('user', tokenJson.token);
          this.ngZone.run(() => this.router.navigate(['']));
        });
        }
      });
    }
  }

  login(): void {
    if (this.azureAdB2CService.isLogin()) {
      this.router.navigate(['']);
    } else {
      this.azureAdB2CService.signIn().subscribe(() => {
        this.featureToggleCookiesService.setCookies();
        this.azureAdB2CService.setCookies();
        const userId = this.azureAdB2CService.getUserId();
        this.userService.loadUser(userId).subscribe((user) => {
          const userGroups = {
            groups: user.groups
          };
          this.loginService.setLocalStorage('user', JSON.stringify(userGroups));
          this.router.navigate(['']);
        });
      });
    }
  }

  loginAuth() {
    window.location.href = `${this.authUrl}/authn/login/${this.authAppName}`;
  }
}
