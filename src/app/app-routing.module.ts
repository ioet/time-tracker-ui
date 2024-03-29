import { AdminGuard } from './guards/admin-guard/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './guards/login-guard/login.guard';
import { ReportsComponent } from './modules/reports/pages/reports.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
import { ActivitiesManagementComponent } from './modules/activities-management/pages/activities-management.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { CustomerComponent } from './modules/customer-management/pages/customer.component';
import { UsersComponent } from './modules/users/pages/users.component';
import { V2RedirectComponent } from './modules/v2-redirect/v2-redirect.component';
import { EnvironmentType } from 'src/environments/enum';
import { environment } from 'src/environments/environment';

const isNotLegacy: boolean = environment.production !== EnvironmentType.TT_PROD_LEGACY;
let routes: Routes;

if (isNotLegacy) {
  routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [LoginGuard],
      children: [
        { path: 'reports', canActivate: [AdminGuard], component: ReportsComponent },
        { path: 'time-clock', component: TimeClockComponent },
        { path: 'time-entries', component: TimeEntriesComponent },
        { path: 'activities-management', component: ActivitiesManagementComponent },
        { path: 'customers-management', canActivate: [AdminGuard], component: CustomerComponent },
        { path: 'users', canActivate: [AdminGuard], component: UsersComponent },
        { path: '', pathMatch: 'full', redirectTo: 'time-clock' },
      ],
    },
    { path: 'login', component: LoginComponent }
  ];

} else {
  routes = [
    {
      path: '',
      children: [
        { path: '**', component: V2RedirectComponent },
      ],
    },
  ];
}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
