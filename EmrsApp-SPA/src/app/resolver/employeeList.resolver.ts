import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../Service/employee.Service';
import { NotificationService } from '../Service/notification.service';
import { EmployeeQueryParams } from '../models/EmployeeQueryParams';

@Injectable()
export class EmployeeListsResolver implements Resolve<Employee[]> {
  employeeParam: EmployeeQueryParams;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private notification: NotificationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Employee[]> {
    this.employeeParam = new EmployeeQueryParams();
    this.employeeParam.searchText = null;
    this.employeeParam.pageNumber = 1;
    this.employeeParam.pageSize = 5;

    return this.employeeService.getEmployees(this.employeeParam).pipe(
      catchError((error) => {
        this.notification.showError('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
