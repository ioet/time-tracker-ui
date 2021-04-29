import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadUser } from 'src/app/modules/user/store/user.actions';
import { AzureAdB2CService } from '../login/services/azure.ad.b2c.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private azureAdB2CService: AzureAdB2CService,
    private store: Store
  ) { }

  ngOnInit(): void {
    const userId = this.azureAdB2CService.getUserId();
    this.store.dispatch(new LoadUser(userId));
  }
}
