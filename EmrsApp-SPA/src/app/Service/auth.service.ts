import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    baseUrl = environment.apiUrl + 'auth/';
    decodedToken: any;
    constructor(private http: HttpClient) {}

    //this.decodedToken = localStorage.getItem('token');


  }
