import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfoService } from 'src/app/modules/user/services/user-info.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userInfoService: UserInfoService,
  ) { }

  canActivate(){
    const isAdmin = this.isAdminBasedInGroup();
    if (!isAdmin) { this.router.navigate(['login']); }
    return isAdmin;
  }

  isAdminBasedInGroup() {
    return this.userInfoService.isAdmin();
  }
}
