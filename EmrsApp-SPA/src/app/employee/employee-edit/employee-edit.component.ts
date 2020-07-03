import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/Service/notification.service';
import { EmployeeService } from 'src/app/Service/employee.Service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: number;
  bsConfig: Partial<BsDatepickerConfig>;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.employeeForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NotificationService,
    private employeService: EmployeeService,
    private avRoute: ActivatedRoute
  ) {
    if (this.avRoute.snapshot.params['id']) {
      this.employeeId = this.avRoute.snapshot.params['id'];
    }
  }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY',
      isAnimated: true,
    };
    this.loadEmployee();
    this.editEmployeeRegisterForm();
  }

  editEmployeeRegisterForm() {
    this.employeeForm = this.fb.group({
      id: 0,
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: [null, Validators.required],
      department: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

 

  loadEmployee() {
    if (this.employeeId > 0) {
      this.employeService.getEmployeeById(this.employeeId).subscribe(
        (response: EmployeeDetail) => {
          if (response.dob) {
            response.dob = new Date(response.dob);
          }
          this.employeeForm.setValue(response);
        },
        (error) => {
          this.notification.showError(error.message);
        }
      );
    }
  }

  update() {
    if (!this.employeeForm.valid) {
      return;
    }

    this.employeService.updateEmployee(this.employeeForm.value).subscribe(
      () => {
        this.notification.showSuccess('Eployee updated successfully!');
        this.employeeForm.reset();
        this.router.navigate(['/employes']);
      },
      (error) => {
        this.notification.showError(error.message);
      }
    );
  }

  cancel() {
    this.router.navigate(['/employes']);
  }
}
