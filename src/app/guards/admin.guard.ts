import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(): boolean {
    if (this._authService.isAdmin() || this._authService.isSuperAdmin()) {
      return true;
    } else if(this._authService.loggedIn()) {
      this._router.navigate(['/']);
      return false;
    } else {          
      this._router.navigate(['/login']);
      return false;
    }
  }
}
