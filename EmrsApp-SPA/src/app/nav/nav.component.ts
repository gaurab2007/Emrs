import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../Service/notification.service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  decodedToken: any;
  constructor(
    private router: Router,
    private notification: NotificationService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.decodedToken = localStorage.getItem('token');
  }

  // login() {
  //   if (this.model.username === 'admin' && this.model.password === '1234') {
  //     localStorage.setItem('token', this.model.username);
  //     this.router.navigate(['/home']);
  //     this.decodedToken = localStorage.getItem('token');
  //     this.notification.showSuccess(
  //       'Welcome ' + this.model.username,
  //       'Success'
  //     );
  //   } else {
  //     this.notification.showError(
  //       'Wrong username or password!Please try again later',
  //       'Error'
  //     );
  //   }
  // }

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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['']);
    this.notification.showSuccess('Logout successfully')
  }
}
