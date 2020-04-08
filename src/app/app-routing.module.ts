import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AzureGuardService } from './guards/azure-guard.service';
import { ReportsComponent } from './modules/reports/pages/reports.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
import { ProjectManagementComponent } from './modules/project-management/pages/project-management.component';
import { ActivitiesManagementComponent } from './modules/activities-management/pages/activities-management.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { CustomerComponent } from './modules/customer/pages/customer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AzureGuardService],
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'time-clock', component: TimeClockComponent },
      { path: 'time-entries', component: TimeEntriesComponent },
      { path: 'project-management', component: ProjectManagementComponent },
      { path: 'activities-management', component: ActivitiesManagementComponent },
      { path: 'customer', component: CustomerComponent },
      { path: '', pathMatch: 'full', redirectTo: 'time-clock' },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
