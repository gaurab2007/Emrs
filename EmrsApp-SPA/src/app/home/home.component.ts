import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sideBarOpen = true;
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
