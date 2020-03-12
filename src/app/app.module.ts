import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UserComponent } from './components/shared/user/user.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ClockComponent } from './components/shared/clock/clock.component';
import { TimeClockComponent } from './components/options-sidebar/time-clock/time-clock.component';
import { ProjectListComponent } from './components/shared/project-list/project-list.component';
import { DetailsFieldsComponent } from './components/shared/details-fields/details-fields.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    SidebarComponent,
    ClockComponent,
    TimeClockComponent,
    ProjectListComponent,
    DetailsFieldsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

