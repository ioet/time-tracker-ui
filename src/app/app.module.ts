import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { UserComponent } from './modules/shared/components/user/user.component';
import { SidebarComponent } from './modules/shared/components/sidebar/sidebar.component';
import { ClockComponent } from './modules/shared/components/clock/clock.component';
import { TimeClockComponent } from './modules/time-clock/pages/time-clock.component';
import { TimeEntriesComponent } from './modules/time-entries/pages/time-entries.component';
import { DetailsFieldsComponent } from './modules/shared/components/details-fields/details-fields.component';
import { ProjectListHoverComponent } from './modules/time-clock/components/project-list-hover/project-list-hover.component';
import { MonthPickerComponent } from './modules/shared/components/month-picker/month-picker.component';
import { EmptyStateComponent } from './modules/shared/components/empty-state/empty-state.component';
import { GroupByDatePipe } from './modules/shared/pipes/group-by-date/group-by-date.pipe';
import { ActivitiesManagementComponent } from './modules/activities-management/pages/activities-management.component';
import { ActivityListComponent } from './modules/activities-management/components/activity-list/activity-list.component';
import { CreateActivityComponent } from './modules/activities-management/components/create-activity/create-activity.component';
import { FilterProjectPipe } from './modules/shared/pipes/filter-project/filter-project.pipe';
import { SearchComponent } from './modules/shared/components/search/search.component';
import { EntryFieldsComponent } from './modules/time-clock/components/entry-fields/entry-fields.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ActivityEffects } from './modules/activities-management/store/activity-management.effects';
import { ProjectEffects } from './modules/customer-management/components/projects/components/store/project.effects';
import { TechnologyEffects } from './modules/shared/store/technology.effects';
import { ProjectTypeEffects } from './modules/customer-management/components/projects-type/store/project-type.effects';
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
import { UserEffects as UsersEffects } from './modules/users/store/user.effects';
import { UserEffects } from './modules/user/store/user.effects';
import { EntryEffects } from './modules/time-clock/store/entry.effects';
import { InjectTokenInterceptor } from './modules/shared/interceptors/inject.token.interceptor';
import { SubstractDatePipe } from './modules/shared/pipes/substract-date/substract-date.pipe';
import { TechnologiesComponent } from './modules/shared/components/technologies/technologies.component';
import { TimeEntriesSummaryComponent } from './modules/time-clock/components/time-entries-summary/time-entries-summary.component';
import { TimeDetailsPipe } from './modules/time-clock/pipes/time-details.pipe';
import { InputLabelComponent } from './modules/shared/components/input-label/input-label.component';
import { ReportsComponent } from './modules/reports/pages/reports.component';
import { InputDateComponent } from './modules/shared/components/input-date/input-date.component';
import { TimeRangeFormComponent } from './modules/reports/components/time-range-form/time-range-form.component';
import { TimeEntriesTableComponent } from './modules/reports/components/time-entries-table/time-entries-table.component';
import { DialogComponent } from './modules/shared/components/dialog/dialog.component';
import { LoadingBarComponent } from './modules/shared/components/loading-bar/loading-bar.component';
import { UsersComponent } from './modules/users/pages/users.component';
import { UsersListComponent } from './modules/users/components/users-list/users-list.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// tslint:disable-next-line: max-line-length
import { TechnologyReportTableComponent } from './modules/technology-report/components/technology-report-table/technology-report-table.component';
import { TechnologyReportComponent } from './modules/technology-report/pages/technology-report.component';
import { CalendarComponent } from './modules/time-entries/components/calendar/calendar.component';
import { DropdownComponent } from './modules/shared/components/dropdown/dropdown.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DarkModeComponent } from './modules/shared/components/dark-mode/dark-mode.component';

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
    UsersComponent,
    UsersListComponent,
    TechnologyReportComponent,
    TechnologyReportTableComponent,
    CalendarComponent,
    DropdownComponent,
    DarkModeComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
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
    NgxMaterialTimepickerModule,
    UiSwitchModule,
    DragDropModule,
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
      UsersEffects,
      UserEffects,
    ]),
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectTokenInterceptor,
      multi: true,
    },
    DatePipe,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
