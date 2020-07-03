import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { BreadcrumbModule } from 'angular-crumbs';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { AuthService } from './Service/auth.service';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeNewComponent } from './employee/employee-new/employee-new.component';
import { NotificationService } from './Service/notification.service';
import { EmployeeListsResolver } from './resolver/employeeList.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { PreventUnsavedChangesEdit } from './guards/prevent-unsaved-changes-employee-edit.guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    EmployeeListComponent,
    EmployeeNewComponent,
    EmployeeEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [
    AuthService,
    NotificationService,
    EmployeeListsResolver,
    PreventUnsavedChanges,
    PreventUnsavedChangesEdit,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
