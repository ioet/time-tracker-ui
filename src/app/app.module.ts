import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { UserComponent } from './modules/shared/components/user/user.component';
import { SidebarComponent } from './modules/shared/components/sidebar/sidebar.component';
import { ClockComponent } from './modules/shared/components/clock/clock.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { ProjectManagementComponent } from './modules/project-management/pages/project-management.component';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
import { ProjectListComponent } from './modules/project-management/components/project-list/project-list.component';
import { CreateProjectComponent } from './modules/project-management/components/create-project/create-project.component';
import { DetailsFieldsComponent } from './modules/shared/components/details-fields/details-fields.component';
import { ProjectListHoverComponent } from './modules/time-clock/components/project-list-hover/project-list-hover.component';
import { ModalComponent } from './modules/shared/components/modal/modal.component';
import { MonthPickerComponent } from './modules/shared/components/month-picker/month-picker.component';
import { EmptyStateComponent } from './modules/shared/components/empty-state/empty-state.component';
import { GroupByDatePipe } from './modules/shared/pipes/group-by-date/group-by-date.pipe';
import { ActivitiesManagementComponent } from './modules/activities-management/pages/activities-management.component';
import { ActivityListComponent } from './modules/activities-management/components/activity-list/activity-list.component';
import { CreateActivityComponent } from './modules/activities-management/components/create-activity/create-activity.component';
import { FilterProjectPipe } from './modules/shared/pipes/filter-project/filter-project.pipe';
import { SearchProjectComponent } from './modules/shared/components/search-project/search-project.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ActivityEffects } from './modules/activities-management/store/activity-management.effects';
import { ProjectEffects } from './modules/project-management/store/project.effects';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { CustomerComponent } from './modules/customer/pages/customer.component';
import { CustomerTableListComponent } from './modules/customer/components/customer-table-list/customer-table-list.component';
import { SearchComponent } from './modules/customer/components/search/search.component';
import { ManagmentCustomerProjectsComponent } from './modules/customer/components/managment-customer-projects/managment-customer-projects.component';
import { InputCustomerComponent } from './modules/customer/components/input-customer/input-customer';
import { InputProjectComponent } from './modules/customer/components/input-project/input-project.component';
import { ProjectTableListComponent } from './modules/customer/components/project-table-list/project-table-list.component';
import { ProjectTypeTableListComponent } from './modules/customer/components/project-type-table-list/project-type-table-list.component';
import { InputProjectTypeComponent } from './modules/customer/components/input-project-type/input-project-type.component';

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
    ActivitiesManagementComponent,
    CreateActivityComponent,
    ActivityListComponent,
    HomeComponent,
    LoginComponent,
    FilterProjectPipe,
    SearchProjectComponent,
    CustomerComponent,
    CustomerTableListComponent,
    SearchComponent,
    ManagmentCustomerProjectsComponent,
    InputCustomerComponent,
    InputProjectComponent,
    ProjectTableListComponent,
    ProjectTypeTableListComponent,
    InputProjectTypeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 15, // Retains last 15 states
        })
      : [],
    EffectsModule.forRoot([ProjectEffects, ActivityEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
