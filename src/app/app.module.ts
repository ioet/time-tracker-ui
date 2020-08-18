import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DataTablesModule } from 'angular-datatables';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityListComponent } from './modules/activities-management/components/activity-list/activity-list.component';
import { CreateActivityComponent } from './modules/activities-management/components/create-activity/create-activity.component';
import { ActivitiesManagementComponent } from './modules/activities-management/pages/activities-management.component';
import { ActivityEffects } from './modules/activities-management/store/activity-management.effects';
import { CreateCustomerComponent } from './modules/customer-management/components/customer-info/components/create-customer/create-customer';
// tslint:disable-next-line: max-line-length
import { CustomerListComponent } from './modules/customer-management/components/customer-info/components/customer-list/customer-list.component';
// tslint:disable-next-line: max-line-length
import { ManagementCustomerProjectsComponent } from './modules/customer-management/components/management-customer-projects/management-customer-projects.component';
// tslint:disable-next-line: max-line-length
import { CreateProjectTypeComponent } from './modules/customer-management/components/projects-type/components/create-project-type/create-project-type.component';
// tslint:disable-next-line: max-line-length
import { ProjectTypeListComponent } from './modules/customer-management/components/projects-type/components/project-type-list/project-type-list.component';
import { ProjectTypeEffects } from './modules/customer-management/components/projects-type/store/project-type.effects';
// tslint:disable-next-line: max-line-length
import { CreateProjectComponent } from './modules/customer-management/components/projects/components/create-project/create-project.component';
import { ProjectListComponent } from './modules/customer-management/components/projects/components/project-list/project-list.component';
import { ProjectEffects } from './modules/customer-management/components/projects/components/store/project.effects';
import { CustomerComponent } from './modules/customer-management/pages/customer.component';
import { CustomerEffects } from './modules/customer-management/store/customer-management.effects';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { TimeEntriesTable2Component } from './modules/reports/components/time-entries-infinity-table/time-entries-table.component';
import { TimeEntriesTableComponent } from './modules/reports/components/time-entries-table/time-entries-table.component';
import { TimeRangeFormComponent } from './modules/reports/components/time-range-form/time-range-form.component';
import { ReportsComponent } from './modules/reports/pages/reports.component';
import { ClockComponent } from './modules/shared/components/clock/clock.component';
import { DetailsFieldsComponent } from './modules/shared/components/details-fields/details-fields.component';
import { DialogComponent } from './modules/shared/components/dialog/dialog.component';
import { EmptyStateComponent } from './modules/shared/components/empty-state/empty-state.component';
import { InputDateComponent } from './modules/shared/components/input-date/input-date.component';
import { InputLabelComponent } from './modules/shared/components/input-label/input-label.component';
import { LoadingBarComponent } from './modules/shared/components/loading-bar/loading-bar.component';
import { MonthPickerComponent } from './modules/shared/components/month-picker/month-picker.component';
import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { SearchComponent } from './modules/shared/components/search/search.component';
import { SidebarComponent } from './modules/shared/components/sidebar/sidebar.component';
import { TechnologiesComponent } from './modules/shared/components/technologies/technologies.component';
import { UserComponent } from './modules/shared/components/user/user.component';
import { InjectTokenInterceptor } from './modules/shared/interceptors/inject.token.interceptor';
import { FilterProjectPipe } from './modules/shared/pipes/filter-project/filter-project.pipe';
import { GroupByDatePipe } from './modules/shared/pipes/group-by-date/group-by-date.pipe';
import { SubstractDatePipe } from './modules/shared/pipes/substract-date/substract-date.pipe';
import { TechnologyEffects } from './modules/shared/store/technology.effects';
import { EntryFieldsComponent } from './modules/time-clock/components/entry-fields/entry-fields.component';
import { ProjectListHoverComponent } from './modules/time-clock/components/project-list-hover/project-list-hover.component';
import { TimeEntriesSummaryComponent } from './modules/time-clock/components/time-entries-summary/time-entries-summary.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { TimeDetailsPipe } from './modules/time-clock/pipes/time-details.pipe';
import { EntryEffects } from './modules/time-clock/store/entry.effects';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
import { metaReducers, reducers } from './reducers';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

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
    SearchComponent,
    CustomerComponent,
    CustomerListComponent,
    ManagementCustomerProjectsComponent,
    CreateCustomerComponent,
    CreateProjectComponent,
    ProjectListComponent,
    ProjectTypeListComponent,
    CreateProjectTypeComponent,
    EntryFieldsComponent,
    SubstractDatePipe,
    TechnologiesComponent,
    TimeEntriesSummaryComponent,
    TimeDetailsPipe,
    InputLabelComponent,
    ReportsComponent,
    InputDateComponent,
    TimeRangeFormComponent,
    TimeEntriesTableComponent,
    DialogComponent,
    LoadingBarComponent,
    TimeEntriesTable2Component
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    DataTablesModule,
    AutocompleteLibModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
        maxAge: 15, // Retains last 15 states
      })
      : [],
    EffectsModule.forRoot([
      ProjectEffects,
      ActivityEffects,
      CustomerEffects,
      TechnologyEffects,
      ProjectTypeEffects,
      EntryEffects,
    ]),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectTokenInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
