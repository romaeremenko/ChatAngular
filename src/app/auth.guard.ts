import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationUserService} from './service/auth/authorization-user.service';
import {LocalStorageService} from './service/localStorage/local-storage.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authorizationUserService: AuthorizationUserService, private localStorageService: LocalStorageService,
              private router: Router) {
    const data = this.localStorageService.getUserLoggedIn();
    if (!!data) {
      this.authorizationUserService.login(data);
      this.authorizationUserService.isAuth = true;
    }
  }

  canLoad(route: Route): any {
    return !this.authorizationUserService.isAuth;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return !this.authorizationUserService.isAuth;
  }
}
