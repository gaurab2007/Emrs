import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TenantEditComponent } from '../tenent/tenant-edit/tenant-edit.component';

@Injectable()
export class PreventUnsavedChangesTenantEdit
  implements CanDeactivate<TenantEditComponent> {
  canDeactivate(component: TenantEditComponent) {
    if (component.tenantForm.dirty) {
      return confirm(
        'Are you sure you want to continue?  Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
