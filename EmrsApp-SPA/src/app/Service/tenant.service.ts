import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tenant } from '../Models/tenant';
import { TenantQueryParams } from '../Models/TenantQueryParams';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTenants(queryParams?: TenantQueryParams): Observable<Tenant[]> {
    if (!queryParams.searchText) {
      queryParams.searchText = '';
    }

    // This HttpParams is required to send query params as object
    let params = new HttpParams();
    params = params.append('searchText', queryParams.searchText);
    params = params.append('pageNumber', queryParams.pageNumber.toString());
    params = params.append('pageSize', queryParams.pageSize.toString());

    return this.http.get<Tenant[]>(this.baseUrl + 'tenant/all' , {observe: 'response', params})
    .pipe(
      map((response) => {
        return response.body;
      })
    );
  }

  getTenantById(id: number) {
    return this.http.get(this.baseUrl + 'tenant/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

  saveTenant(tenant: Tenant) {
    return this.http.post(this.baseUrl + 'tenant/create', tenant);
  }

  updateTenant(tenant: Tenant) {
    return this.http.put(this.baseUrl + 'tenant/edit', tenant)
      .pipe(map(
        response => {
          return response;
        }));
  }

}
