import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GettingStartedComponent } from './components/options-sidebar/getting-started/getting-started.component';
import { ReportsComponent } from './components/options-sidebar/reports/reports.component';
import { TimeClockComponent } from './components/options-sidebar/time-clock/time-clock.component';
import { TimeEntriesComponent } from './components/options-sidebar/time-entries/time-entries.component';
import { TimeOffComponent } from './components/options-sidebar/time-off/time-off.component';
import { ProjectManagementComponent } from './components/options-sidebar/project-management/project-management.component';

const routes: Routes = [
  {path: 'getting-started', component: GettingStartedComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'time-clock', component: TimeClockComponent},
  {path: 'time-entries', component: TimeEntriesComponent},
  {path: 'time-off', component: TimeOffComponent},
  {path: 'project-management', component: ProjectManagementComponent},
  {path: '', pathMatch: 'full', redirectTo: 'getting-started'},
  {path: '**', pathMatch: 'full', redirectTo: 'getting-started'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
