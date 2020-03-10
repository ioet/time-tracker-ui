import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TimeclockComponent } from './components/shared/clock/timeclock/timeclock.component';
import { UserOptionsComponent } from './components/shared/user/user-options/user-options.component';
import { SidebarOptionsComponent } from './components/shared/sidebar/sidebar-options/sidebar-options.component';
import { ClockComponent } from './components/shared/clock/clock.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { UserComponent } from './components/shared/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TimeclockComponent,
    UserOptionsComponent,
    SidebarOptionsComponent,
    ClockComponent,
    SidebarComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
