import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Service/notification.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  decodedToken: any;
  constructor(
    private router: Router,
    private notification: NotificationService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(
      (next) => {
        this.notification.showSuccess(
          'Welcome ' + this.model.username,
          'Success'
        );
      },
      (error) => {
        this.notification.showError(
          'Wrong username or password!Please try again later',
          'Error'
        );
      },
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
