import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Service/employee.Service';
import { Employee } from 'src/app/Models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { EmployeeQueryParams } from 'src/app/models/EmployeeQueryParams';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  model: any = {};
  employeeParam: EmployeeQueryParams;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.employees = data['employees'];

      this.employeeParam = new EmployeeQueryParams();
      this.employeeParam.searchText = null;
      this.employeeParam.pageNumber = 1;
      this.employeeParam.pageSize = 5;

      if (this.employees != null) {
        this.employeeParam.totalItems = this.employees[0].totalDataCount;
      }
    });
  }

  deleteMessage(id: number) {
    swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.value) {
          this.employeeService.deleteEmployee(id).subscribe(
            () => {
              swal.fire('Deleted!', 'Employee deleted.', 'success');
              this.loadEmployee();
            },
            (error) => console.error(error)
          );
        }
      });
  }

  loadEmployee() {
    this.employeeParam.searchText = this.model.searchText;

    this.employeeService.getEmployees(this.employeeParam).subscribe(
      (response) => {
        this.employees = response;
        if (this.employees != null) {
          this.employeeParam.totalItems = this.employees[0].totalDataCount;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search() {
    this.employeeParam.pageNumber = 1;
    this.loadEmployee();
  }

  pageChanged(event: any): void {
    this.employeeParam.pageNumber = event.page;
    this.loadEmployee();
  }

  navigate(id: number) {
    if (this.model.searchText) {
      this.employeeParam.searchText = this.model.searchText;
    }

    this.router.navigate(['/employes', id]);
  }

  reset() {
    this.model.searchText = null;
    this.loadEmployee();
  }
}
