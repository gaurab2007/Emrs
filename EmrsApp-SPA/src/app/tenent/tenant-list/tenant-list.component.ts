import { Component, OnInit } from '@angular/core';
import { Tenant } from 'src/app/Models/tenant';
import { TenantQueryParams } from 'src/app/Models/TenantQueryParams';
import { TenantService } from 'src/app/Service/tenant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})
export class TenantListComponent implements OnInit {
  tenants: Tenant[];
  model: any = {};
  tenantParam: TenantQueryParams;

  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.tenants = data['tenants'];

      this.tenantParam = new TenantQueryParams();
      this.tenantParam.searchText = null;
      this.tenantParam.pageNumber = 1;
      this.tenantParam.pageSize = 5;

      if (this.tenants != null && this.tenants.length > 0) {
        this.tenantParam.totalItems = this.tenants[0].totalDataCount;
      }
    });
  }

  loadTenant() {
    this.tenantParam.searchText = this.model.searchText;

    this.tenantService.getTenants(this.tenantParam).subscribe(
      (response) => {
        this.tenants = response;
        if (this.tenants != null && this.tenants.length > 0) {
          this.tenantParam.totalItems = this.tenants[0].totalDataCount;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search() {
    this.tenantParam.pageNumber = 1;
    this.loadTenant();
  }

  pageChanged(event: any): void {
    this.tenantParam.pageNumber = event.page;
    this.loadTenant();
  }

  navigate(id: number) {
    if (this.model.searchText) {
      this.tenantParam.searchText = this.model.searchText;
    }

    this.router.navigate(['/tenants', id]);
  }

  reset() {
    this.model.searchText = null;
    this.loadTenant();
  }

}
