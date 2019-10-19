import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './service/auth/auth.service';
import {Observable, of} from 'rxjs';
import {Promise} from 'q';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.isAutenticated();
  }
}
