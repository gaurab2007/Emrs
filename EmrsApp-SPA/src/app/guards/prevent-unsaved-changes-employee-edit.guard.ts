import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EmployeeEditComponent } from '../employee/employee-edit/employee-edit.component';

@Injectable()
export class PreventUnsavedChangesEdit
  implements CanDeactivate<EmployeeEditComponent> {
  canDeactivate(component: EmployeeEditComponent) {
    if (component && component.employeeForm.dirty) {
      return confirm(
        'Are you sure you want to continue?  Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
