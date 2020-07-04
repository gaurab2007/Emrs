import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { NotificationService } from '../Service/notification.service';
import { AuthService } from '../Service/auth.service';
import { IBreadCrumb } from '../models/breadcrumb.interface';
import { filter, distinctUntilChanged  } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  decodedToken: any;
  public breadcrumbs: IBreadCrumb[];

  constructor(
    private router: Router,
    private notification: NotificationService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
      this.decodedToken = localStorage.getItem('token');
      // this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      // this.router.events.pipe(
      //   filter((event: Event) => event instanceof NavigationEnd), distinctUntilChanged(),
      // ).subscribe(() => {
      //   this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      // });

      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root));
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['']);
    this.notification.showSuccess('Logout successfully');
  }

  // /**
  //  * Recursively build breadcrumb according to activated route.
  //  * @param route
  //  * @param url
  //  * @param breadcrumbs
  //  */
  buildBreadCrumb( route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = [] ): IBreadCrumb[] {
    // If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path ? '${url}/${path}' : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
