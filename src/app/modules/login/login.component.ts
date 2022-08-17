import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from './services/azure.ad.b2c.service';
import { Router } from '@angular/router';
import { FeatureToggleCookiesService } from '../shared/feature-toggles/feature-toggle-cookies/feature-toggle-cookies.service';

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { EnvironmentType } from 'src/environments/enum';
import { LoginService } from './services/login.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser;
  isProduction = environment.production === EnvironmentType.TT_PROD_LEGACY;

  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private featureToggleCookiesService: FeatureToggleCookiesService,
    private socialAuthService: SocialAuthService,
    private loginService?: LoginService,
    private userService?: UserService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.featureToggleCookiesService.setCookies();
        this.loginService.setLocalStorage('idToken', user.idToken);
        this.loginService.getUser(user.idToken).subscribe((response) => {
          this.loginService.setCookies();
          const tokenObject = JSON.stringify(response);
          const tokenJson = JSON.parse(tokenObject);
          this.loginService.setLocalStorage('user', tokenJson.token);
          this.router.navigate(['']);
        });
      }
    });
  }

  login(): void {
    if (this.azureAdB2CService.isLogin()) {
      this.router.navigate(['']);
    } else {
      this.azureAdB2CService.signIn().subscribe(() => {
        this.featureToggleCookiesService.setCookies();
        this.azureAdB2CService.setCookies();
        const userId = this.azureAdB2CService.getUserId()
        this.userService.loadUser(userId).subscribe((user) => {
          const user_groups = {
            groups: user.groups
          }
          this.loginService.setLocalStorage('user', JSON.stringify(user_groups));
          this.router.navigate(['']);
        })
      });
    }
  }

  loginWithGoogle() {
    this.loginService.isLogin().subscribe(isLogin => {
      if (isLogin) {
        this.router.navigate(['']);
      } else {
        this.loginService.signIn();
      }
    });
  }
}
