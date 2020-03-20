import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './components/options-sidebar/reports/reports.component';
import { TimeClockComponent } from './components/options-sidebar/time-clock/time-clock.component';
import { TimeEntriesComponent } from './components/options-sidebar/time-entries/time-entries.component';
import { ProjectManagementComponent } from './components/options-sidebar/project-management/project-management.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  { path: '', component: HomeComponent, 
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'time-clock', component: TimeClockComponent },
      { path: 'time-entries', component: TimeEntriesComponent },
      { path: 'project-management', component: ProjectManagementComponent } 
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
