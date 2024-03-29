import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EnvironmentType } from 'src/environments/enum';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userName: string;
  userEmail: string;
  isProduction = environment.production === EnvironmentType.TT_PROD_LEGACY;

  constructor(private azureAdB2CService: AzureAdB2CService, private loginService: LoginService) {}

  ngOnInit(): void {
    if (this.isProduction){
      if (this.azureAdB2CService.isLogin()) {
        this.userName = this.azureAdB2CService.getName();
        this.userEmail = this.azureAdB2CService.getUserEmail();
        this.azureAdB2CService.setTenantId();
      }
    } else {
      this.loginService.isLogin().subscribe(isLogin => {
        if (isLogin) {
          this.userName = this.loginService.getName();
          this.userEmail = this.loginService.getUserEmail();
          this.azureAdB2CService.setTenantId();
        }
      });
    }
  }
}
