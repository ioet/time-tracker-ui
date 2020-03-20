import { Component } from '@angular/core';
import { AzureAdB2CService } from '../../services/azure.ad.b2c.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private azureAdB2CService: AzureAdB2CService, private router:Router) {}

  login(): void {
    if(this.azureAdB2CService.isLogin()) {
      this.router.navigate(['']);
    } else {
      this.azureAdB2CService.signIn().subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

}
