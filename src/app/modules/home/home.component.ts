import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadUser } from 'src/app/modules/user/store/user.actions';
import { environment } from 'src/environments/environment';
import { EnvironmentType } from 'src/environments/enum';
import { AzureAdB2CService } from '../login/services/azure.ad.b2c.service';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isProduction = environment.production === EnvironmentType.TT_PROD_LEGACY;
  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private loginService: LoginService,
    private store: Store
  ) { }

  ngOnInit(): void {
    const userId =  this.isProduction ? this.azureAdB2CService.getUserId() : this.loginService.getUserId();
    this.store.dispatch(new LoadUser(userId));
  }
}
