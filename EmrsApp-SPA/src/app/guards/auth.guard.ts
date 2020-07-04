import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'; 
import { AuthService } from '../Service/auth.service';
import { NotificationService } from '../Service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.notification.showError('You are not logged in ! You cann not access the resource!');
    this.router.navigate(['']);
    return false;
  }
}
