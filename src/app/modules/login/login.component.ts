import { Component, OnInit, NgZone } from '@angular/core';
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
  cliendId = CLIENT_URL;
  auth2: any;


  constructor(
    private router: Router,
    private featureToggleCookiesService: FeatureToggleCookiesService,
    private loginService?: LoginService,
    private userService?: UserService,
    private ngZone?: NgZone
  ) {}

  ngOnInit() {
    this.loginService.fetchAndCheckUserPermissions();
  }

}
