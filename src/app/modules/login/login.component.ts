import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from './services/azure.ad.b2c.service';
import { Router } from '@angular/router';
import { FeatureToggleCookiesService } from '../shared/feature-toggles/feature-toggle-cookies/feature-toggle-cookies.service';

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser;
  isProduction = environment.production;

  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private router: Router,
    private featureToggleCookiesService: FeatureToggleCookiesService,
    private socialAuthService: SocialAuthService,
    private loginService?: LoginService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.featureToggleCookiesService.setCookies();
        this.loginService.setLocalStorage('idToken', user.idToken);
        this.loginService.getUser(user.idToken).subscribe((response) => {
          this.loginService.setCookies();
          this.loginService.setLocalStorage('user2', JSON.stringify(response));
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
        this.router.navigate(['']);
      });
    }
  }
  loginWithGoogle() {
    if (this.loginService.isLogin()) {
      this.router.navigate(['']);
    } else {
      this.loginService.signIn();
    }
  }
}
