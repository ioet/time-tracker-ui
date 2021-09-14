import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from '../../../login/services/azure.ad.b2c.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userName: string;
  userEmail: string;

  constructor(private azureAdB2CService: AzureAdB2CService) {}

  ngOnInit(): void {
    if (this.azureAdB2CService.isLogin()) {
      this.userName = this.azureAdB2CService.getName();
      this.userEmail = this.azureAdB2CService.getUserEmail();
      this.azureAdB2CService.setTenantId();
    }
  }
}
