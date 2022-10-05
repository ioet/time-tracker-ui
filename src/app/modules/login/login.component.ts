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
  auth2: any;


  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private featureToggleCookiesService: FeatureToggleCookiesService,
    private loginService?: LoginService,
    private userService?: UserService,
    private ngZone?: NgZone
  ) {}


  googleAuthSDK() {
    const sdkLoaded = 'googleSDKLoaded';
    const gapi = 'gapi';

    (window as any)[sdkLoaded] = () => {
      (window as any)[gapi].load('auth2', () => {
        this.auth2 = ( window as any)[gapi].auth2.init({
          client_id: this.cliendId,
          plugin_name: 'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
      });
    };

    (async (d, s, id) => {
      const keyGoogle = 'src';
      const gjs = d.getElementsByTagName(s)[1];
      let js = gjs;
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js[keyGoogle] = 'https://accounts.google.com/gsi/client';
      gjs.parentNode.insertBefore(js, gjs);
    })(document, 'script', 'async defer');
  }

  ngOnInit() {

    this.googleAuthSDK();
    if (this.isProduction && this.azureAdB2CService.isLogin()) {
        this.router.navigate(['']);
    } else {
      this.loginService.isLogin().subscribe(isLogin => {
        if (isLogin) {
          this.router.navigate(['']);
        }
      });
    }
    window.handleCredentialResponse = (response) => {
      const {credential = ''} = response;
      this.featureToggleCookiesService.setCookies();
      this.loginService.setLocalStorage('idToken', credential);
      this.loginService.getUser(credential).subscribe((resp) => {
          this.loginService.setCookies();
          const tokenObject = JSON.stringify(resp);
          const tokenJson = JSON.parse(tokenObject);
          this.loginService.setLocalStorage('user', tokenJson.token);
          this.ngZone.run(() => this.router.navigate(['']));
      });
    };
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

  loginAuth(): void {
    
  }

}
