import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeNewComponent } from './employee/employee-new/employee-new.component';
import { EmployeeListsResolver } from './resolver/employeeList.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { PreventUnsavedChangesEdit } from './guards/prevent-unsaved-changes-employee-edit.guard';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
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
        data: { breadcrumb: 'Employees' },
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
        data: { breadcrumb: 'Detail' },
      },
    ],
  }, 
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
