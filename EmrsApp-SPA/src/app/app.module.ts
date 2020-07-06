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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { NavComponent } from './nav/nav.component'; 
import { appRoutes } from './routes';
import { AuthService } from './Service/auth.service';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeNewComponent } from './employee/employee-new/employee-new.component';
import { NotificationService } from './Service/notification.service';
import { EmployeeListsResolver } from './resolver/employeeList.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { PreventUnsavedChangesEdit } from './guards/prevent-unsaved-changes-employee-edit.guard';
import { ErrorInterceptorProvider } from './service/error.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './service/loader.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    EmployeeListComponent,
    EmployeeNewComponent,
    EmployeeEditComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MatProgressSpinnerModule,
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
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
  ],
  providers: [
    AuthService,
    NotificationService,
    EmployeeListsResolver,
    PreventUnsavedChanges,
    PreventUnsavedChangesEdit,
    ErrorInterceptorProvider,
    LoaderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
