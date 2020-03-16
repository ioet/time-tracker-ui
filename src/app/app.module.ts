import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UserComponent } from './components/shared/user/user.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ClockComponent } from './components/shared/clock/clock.component';
import { TimeClockComponent } from './components/optionsSidebar/time-clock/time-clock.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    SidebarComponent,
    ClockComponent,
    TimeClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

