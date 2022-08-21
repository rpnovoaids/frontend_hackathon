import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActiveGuard implements CanActivate {
  constructor(
    private _Router: Router,
    private _AuthService: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this._AuthService.isLoggedIn(state.url) ) {
      return true;
    }
    this._Router.navigate(['/auth/login']);
    return false;
  }
}
