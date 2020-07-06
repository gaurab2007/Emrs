import { Routes } from '@angular/router';
 
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeNewComponent } from './employee/employee-new/employee-new.component';
import { EmployeeListsResolver } from './resolver/employeeList.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { PreventUnsavedChangesEdit } from './guards/prevent-unsaved-changes-employee-edit.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TenantListComponent } from './tenent/tenant-list/tenant-list.component';
import { TenantListsResolver } from './resolver/tenantList.resolver';
import { TenantNewComponent } from './tenent/tenant-new/tenant-new.component';
import { PreventUnsavedChangesTenant } from './guards/prevent-unsaved-changes-tenant.guard';
import { TenantEditComponent } from './tenent/tenant-edit/tenant-edit.component';
import { PreventUnsavedChangesTenantEdit } from './guards/prevent-unsaved-changes-tenant-edit.guard';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
      {
        path: 'employes',
        component: EmployeeListComponent,
        resolve: { employees: EmployeeListsResolver },
      },
      {
        path: 'employes/new',
        component: EmployeeNewComponent,
        canDeactivate: [PreventUnsavedChanges],
        data: { breadcrumb: 'New' },
      },
      {
        path: 'employes/:id',
        component: EmployeeEditComponent,
        canDeactivate: [PreventUnsavedChangesEdit],
        data: { breadcrumb: '' },
      },
      {
        path: 'tenants',
        component: TenantListComponent,
        resolve: { tenants: TenantListsResolver },
      },
      {
        path: 'tenants/new',
        component: TenantNewComponent,
        canDeactivate: [PreventUnsavedChangesTenant],
      },
      {
        path: 'tenants/:id',
        component: TenantEditComponent,
        canDeactivate: [PreventUnsavedChangesTenantEdit],
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
