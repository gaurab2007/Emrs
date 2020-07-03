import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeNewComponent } from './employee/employee-new/employee-new.component';
import { EmployeeListsResolver } from './resolver/employeeList.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { PreventUnsavedChangesEdit } from './guards/prevent-unsaved-changes-employee-edit.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'employes',
    component: EmployeeListComponent,
    resolve: { employees: EmployeeListsResolver },
  },
  {
    path: 'employes/new',
    component: EmployeeNewComponent,
    canDeactivate: [PreventUnsavedChanges],
  },
  {
    path: 'employes/:id',
    component: EmployeeEditComponent,
    canDeactivate: [PreventUnsavedChangesEdit],
  },
  // { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
