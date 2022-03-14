import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';
import { LoginService } from '../../../login/services/login.service';
import { SocialUser, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: SocialUser;
  userPhoto: string;
  userName: string;
  userEmail: string;
  isProduction = environment.production;

  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private loginService: LoginService,
    private authService: SocialAuthService,
  ) { }

  ngOnInit(): void {
    if (this.isProduction) {
      if (this.azureAdB2CService.isLogin()) {
        this.userName = this.azureAdB2CService.getName();
        this.userEmail = this.azureAdB2CService.getUserEmail();
        this.azureAdB2CService.setTenantId();
      }
    } else {
      if (this.loginService.isLogin()) {
        this.userName = this.loginService.getName();
        this.userEmail = this.loginService.getUserEmail();
        this.azureAdB2CService.setTenantId();
      }
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.userPhoto = user.photoUrl;
      localStorage.setItem('googleUserPhoto', this.userPhoto);
    });
    this.userPhoto = localStorage.getItem('googleUserPhoto');
  }
}
