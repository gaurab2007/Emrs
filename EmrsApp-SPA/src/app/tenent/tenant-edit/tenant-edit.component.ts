import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/Service/notification.service';
import { Tenant } from 'src/app/Models/tenant';
import { TenantService } from 'src/app/Service/tenant.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tenant-edit',
  templateUrl: './tenant-edit.component.html',
  styleUrls: ['./tenant-edit.component.css']
})
export class TenantEditComponent implements OnInit {
  tenantId: number;
  tenant: Tenant;
  @ViewChild('tenantForm') tenantForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.tenantForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private router: Router,
    private notification: NotificationService,
    private tenantService: TenantService,
    private avRoute: ActivatedRoute,
  ) {
    if (this.avRoute.snapshot.params['id']) {
      this.tenantId = this.avRoute.snapshot.params['id'];
    }
   }

  ngOnInit() {
    this.loadTenant();
  }

  loadTenant() {
    if (this.tenantId > 0) {
      this.tenantService.getTenantById(this.tenantId).subscribe(
        (response: Tenant) => {
          this.tenant = response;
        },
        (error) => {
          this.notification.showError(error.message);
        }
      );
    }
  }

  update() {
    if (!this.tenantForm.valid) {
      return;
    }

    this.tenantService.updateTenant(this.tenant).subscribe(
      () => {
        this.notification.showSuccess('Tenant updated successfully!');
        this.tenantForm.reset();
        this.router.navigate(['/tenants']);
      },
      (error) => {
        this.notification.showError(error.message);
      }
    );
  }

  cancel() {
    this.router.navigate(['/tenants']);
  }
}
