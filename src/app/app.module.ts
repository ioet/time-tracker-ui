import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UserComponent } from './components/shared/user/user.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ClockComponent } from './components/shared/clock/clock.component';
import { OptionsSidebarComponent } from './components/options-sidebar/options-sidebar.component';
import { GettingStartedComponent } from './components/optionsSidebar/getting-started/getting-started.component';
import { TimeClockComponent } from './components/optionsSidebar/time-clock/time-clock.component';
import { TimeEntriesComponent } from './components/optionsSidebar/time-entries/time-entries.component';
import { TimeOffComponent } from './components/optionsSidebar/time-off/time-off.component';
import { ReportsComponent } from './components/optionsSidebar/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    SidebarComponent,
    ClockComponent,
    OptionsSidebarComponent,
    GettingStartedComponent,
    TimeClockComponent,
    TimeEntriesComponent,
    TimeOffComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
