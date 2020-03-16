import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GettingStartedComponent } from './components/options-sidebar/getting-started/getting-started.component';
import { ReportsComponent } from './components/options-sidebar/reports/reports.component';
import { TimeClockComponent } from './components/options-sidebar/time-clock/time-clock.component';
import { TimeEntriesComponent } from './components/options-sidebar/time-entries/time-entries.component';
import { TimeOffComponent } from './components/options-sidebar/time-off/time-off.component';


const routes: Routes = [
  {path: 'gettingStarted', component: GettingStartedComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'timeClock', component: TimeClockComponent},
  {path: 'timeEntries', component: TimeEntriesComponent},
  {path: 'timeOff', component: TimeOffComponent},
  {path: '', pathMatch: 'full', redirectTo: 'gettingStarted'},
  {path: '**', pathMatch: 'full', redirectTo: 'gettingStarted'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
