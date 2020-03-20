import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UserComponent } from './components/shared/user/user.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ClockComponent } from './components/shared/clock/clock.component';
import { TimeClockComponent } from './components/options-sidebar/time-clock/time-clock.component';
import { ProjectManagementComponent } from './components/options-sidebar/project-management/project-management.component';
import { TimeEntriesComponent } from './components/options-sidebar/time-entries/time-entries.component';
import { ProjectListComponent } from './components/shared/project-list/project-list.component';
import { CreateProjectComponent } from './components/shared/create-project/create-project.component';
import { DetailsFieldsComponent } from './components/shared/details-fields/details-fields.component';
import { ProjectListHoverComponent } from './components/shared/project-list-hover/project-list-hover.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { MonthPickerComponent } from './components/shared/month-picker/month-picker.component';
import { EmptyStateComponent } from './components/shared/empty-state/empty-state.component';
import { GroupByDatePipe } from './components/shared/pipes/group-by-date/group-by-date.pipe';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    SidebarComponent,
    ClockComponent,
    TimeClockComponent,
    ProjectManagementComponent,
    ProjectListComponent,
    CreateProjectComponent,
    TimeClockComponent,
    DetailsFieldsComponent,
    ProjectListHoverComponent,
    ModalComponent,
    TimeEntriesComponent,
    MonthPickerComponent,
    EmptyStateComponent,
    GroupByDatePipe,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
