import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { UserComponent } from './modules/shared/components/user/user.component';
import { SidebarComponent } from './modules/shared/components/sidebar/sidebar.component';
import { ClockComponent } from './modules/shared/components/clock/clock.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
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
import { TechnologyEffects } from './modules/shared/store/technology.effects';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { CustomerComponent } from './modules/customer-management/pages/customer.component';
// tslint:disable-next-line: max-line-length
import { CustomerListComponent } from './modules/customer-management/components/customer-info/components/customer-list/customer-list.component';
// tslint:disable-next-line: max-line-length
import { ManagementCustomerProjectsComponent } from './modules/customer-management/components/management-customer-projects/management-customer-projects.component';
import { CreateCustomerComponent } from './modules/customer-management/components/customer-info/components/create-customer/create-customer';
// tslint:disable-next-line: max-line-length
import { CreateProjectComponent } from './modules/customer-management/components/projects/components/create-project/create-project.component';
import { ProjectListComponent } from './modules/customer-management/components/projects/components/project-list/project-list.component';
// tslint:disable-next-line: max-line-length
import { ProjectTypeListComponent } from './modules/customer-management/components/projects-type/components/project-type-list/project-type-list.component';
// tslint:disable-next-line: max-line-length
import { CreateProjectTypeComponent } from './modules/customer-management/components/projects-type/components/create-project-type/create-project-type.component';
import { CustomerEffects } from './modules/customer-management/store/customer-management.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    SidebarComponent,
    ClockComponent,
    TimeClockComponent,
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
    CustomerListComponent,
    ManagementCustomerProjectsComponent,
    CreateCustomerComponent,
    CreateProjectComponent,
    ProjectListComponent,
    ProjectTypeListComponent,
    CreateProjectTypeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 15, // Retains last 15 states
        })
      : [],
    EffectsModule.forRoot([ProjectEffects, ActivityEffects, CustomerEffects, TechnologyEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
