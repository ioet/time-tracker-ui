import { Component, OnInit } from '@angular/core';
import { AzureAdB2CService } from 'src/app/services/azure.ad.b2c.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  name: string = ''
  constructor(private azureAdB2CService: AzureAdB2CService, private router: Router) { }

  ngOnInit(): void {
    if(this.azureAdB2CService.isLogin()) {
      this.name = this.azureAdB2CService.getName()
    } else {
      this.router.navigate(['login']);
    }
  }

  logout() {
    this.azureAdB2CService.logout()
  }

}
