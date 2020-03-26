// tslint:disable-next-line:max-line-length
import { ActivitiesManagementComponent } from './components/options-sidebar/activities/activities-management/activities-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './components/options-sidebar/reports/reports.component';
import { TimeClockComponent } from './components/options-sidebar/time-clock/time-clock.component';
import { TimeEntriesComponent } from './components/options-sidebar/time-entries/time-entries.component';
import { ProjectManagementComponent } from './components/options-sidebar/project-management/project-management.component';

const routes: Routes = [
  {path: 'reports', component: ReportsComponent},
  {path: 'time-clock', component: TimeClockComponent},
  {path: 'time-entries', component: TimeEntriesComponent},
  {path: 'project-management', component: ProjectManagementComponent},
  {path: 'activities-management', component: ActivitiesManagementComponent},
  {path: '', pathMatch: 'full', redirectTo: 'time-clock'},
  {path: '**', pathMatch: 'full', redirectTo: 'time-clock'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
