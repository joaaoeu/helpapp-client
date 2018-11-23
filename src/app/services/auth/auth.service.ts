import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _apiUrl = 'http://localhost:5001/api';

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  loginUser(user) {
    return this.http.post<any>(this._apiUrl + '/login', user);
  }

  logoutUser() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token') && !!localStorage.getItem('user');
  }
  
  isSuperAdmin() {
    if(!this.loggedIn())
      return false;
    
    return JSON.parse(localStorage.getItem('user')).userType === 1;
  }
  
  isAdmin() {
    if(!this.loggedIn())
      return false;
      
    return JSON.parse(localStorage.getItem('user')).userType === 2;
  }
}
