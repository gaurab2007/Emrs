import { TenantQueryParams } from '../Models/TenantQueryParams';
import { Tenant } from '../Models/tenant';
import { TenantService } from '../Service/tenant.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { NotificationService } from '../Service/notification.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class TenantListsResolver implements Resolve<Tenant[]> {
  tenantParam: TenantQueryParams;
  constructor(
    private tenantService: TenantService,
    private router: Router,
    private notification: NotificationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Tenant[]> {
    this.tenantParam = new TenantQueryParams();
    this.tenantParam.searchText = null;
    this.tenantParam.pageNumber = 1;
    this.tenantParam.pageSize = 5;

    return this.tenantService.getTenants(this.tenantParam).pipe(
      catchError((error) => {
        this.notification.showError('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
