import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(@Inject(Router) private router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url = state.url.toString();

    if (!sessionStorage.getItem('role')) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = sessionStorage.getItem('role');
    if (url.indexOf('rider') === 1 && role !== 'RIDER') {
      this.router.navigate(['/login']);
      return false;
    }

    if (url.indexOf('driver') === 1 && role !== 'DRIVER') {
      this.router.navigate(['/login']);
      return false;
    }

    if (url.indexOf('admin') === 1 && role !== 'ADMIN') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
