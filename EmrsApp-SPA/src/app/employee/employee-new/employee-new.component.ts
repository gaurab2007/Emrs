import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Service/notification.service';
import { EmployeeService } from 'src/app/Service/employee.Service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css'],
})
export class EmployeeNewComponent implements OnInit {
  employeeForm: FormGroup;
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
    private employeService: EmployeeService
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY',
      isAnimated: true,
    };

    this.createEmployeeRegisterForm();
  }

  createEmployeeRegisterForm() {
    this.employeeForm = this.fb.group({
      id: 0,
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: [null, Validators.required],
      department: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  save() {
    if (!this.employeeForm.valid) {
      return;
    } 

    this.employeService.saveEmployee(this.employeeForm.value).subscribe(
      (data) => {
        this.notification.showSuccess('Eployee added successfully!');
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
