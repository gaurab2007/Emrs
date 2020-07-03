import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../Service/notification.service';

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
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.decodedToken = localStorage.getItem('token');
  }

  login() {
    if (this.model.username === 'admin' && this.model.password === '1234') {
      localStorage.setItem('token', this.model.username);
      this.router.navigate(['/home']);
      this.decodedToken = localStorage.getItem('token');
      this.notification.showSuccess(
        'Welcome ' + this.model.username,
        'Success'
      );
    } else {
      this.notification.showError(
        'Wrong username or password!Please try again later',
        'Error'
      );
    }
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    // this.authService.decodedToken = null;
    // this.authService.currentUser = null;
    // this.alertify.message('logout successfully');
    this.router.navigate(['']);
  }
}
