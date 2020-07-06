import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Service/notification.service';
import { TenantService } from 'src/app/Service/tenant.service';
import { NgForm } from '@angular/forms';
import { Tenant } from 'src/app/Models/tenant';

@Component({
  selector: 'app-tenant-new',
  templateUrl: './tenant-new.component.html',
  styleUrls: ['./tenant-new.component.css']
})
export class TenantNewComponent implements OnInit {
  model: any = {};
  @ViewChild('tenantForm', {static: true}) tenantForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.tenantForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private router: Router,
    private notification: NotificationService,
    private tenantService: TenantService
  ) {
  }

  ngOnInit() {
  }

  save() {
    if (!this.tenantForm.valid) {
      return;
    }

    const tenant: Tenant = this.model;
    this.tenantService.saveTenant(tenant).subscribe(
      (data) => {
        this.notification.showSuccess('Tenant added successfully!');
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
