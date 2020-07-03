import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';
import { map } from 'rxjs/operators';
import { EmployeeQueryParams } from '../models/EmployeeQueryParams';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmployees(queryParams?:EmployeeQueryParams): Observable<Employee[]> {
    if(!queryParams.searchText){
      queryParams.searchText='';
    }

    // This HttpParams is required to send query params as object
    let params = new HttpParams();
    params = params.append('searchText', queryParams.searchText);
    params = params.append('pageNumber', queryParams.pageNumber.toString());
    params = params.append('pageSize', queryParams.pageSize.toString());

    return this.http.get<Employee[]>(this.baseUrl + 'employee/all' ,{observe: 'response', params})
    .pipe(
      map((response) => { 
        return response.body;
      })
    );
  }

  getEmployeeById(id: number) {
    return this.http.get(this.baseUrl + 'employee/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }

  saveEmployee(employee: Employee) {
    return this.http.post(this.baseUrl + 'employee/Create', employee);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.baseUrl + 'employee/edit', employee)
      .pipe(map(
        response => {
          return response;
        }));
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.baseUrl + 'employee/delete/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }



}
