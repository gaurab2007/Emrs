import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Service/employee.Service';
import { Employee } from 'src/app/Models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getEmployees().subscribe(
      (response) => {
        this.employees = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
