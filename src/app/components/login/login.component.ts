import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginUserData = {};

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    if (this._authService.loggedIn())
      this._router.navigate(['/']);
  }

  ngOnInit() {
  }
  
  loginUser() {
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        this._router.navigate(['/'])
      },
      err => console.log(err)
    )
  }

}
