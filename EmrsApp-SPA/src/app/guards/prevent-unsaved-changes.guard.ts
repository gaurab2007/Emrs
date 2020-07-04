import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EmployeeNewComponent } from '../employee/employee-new/employee-new.component'; 

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<EmployeeNewComponent> {
  canDeactivate(component: EmployeeNewComponent) {
    if (component && component.employeeForm.dirty) {
      return confirm(
        'Are you sure you want to continue?  Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
