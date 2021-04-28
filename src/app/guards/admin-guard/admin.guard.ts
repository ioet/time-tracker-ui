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

  canActivate(): Observable<boolean> {
    return this.isAdminBasedInGroup().pipe(
      map((isAdmin: boolean) => {
        if (!isAdmin) { this.router.navigate(['login']); }
        return isAdmin;
      })
    );
  }

  isAdminBasedInGroup(): Observable<boolean> {
    return this.userInfoService.isAdmin();
  }
}
