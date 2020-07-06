import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TenantNewComponent } from '../tenent/tenant-new/tenant-new.component';

@Injectable()
export class PreventUnsavedChangesTenant
  implements CanDeactivate<TenantNewComponent> {
  canDeactivate(component: TenantNewComponent) {
    if (component.tenantForm.dirty) {
      return confirm(
        'Are you sure you want to continue?  Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
