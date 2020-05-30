import { Component, OnDestroy } from '@angular/core';
import { AuthorizationUserService } from '../service/auth/authorization-user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  private registration = '/registration';
  user = {
    loginField: '',
    passwordField: ''
  };

  constructor(
    private authorizationUserService: AuthorizationUserService,
    private router: Router,
    private location: Location
  ) {}

  login(){
    return this.authorizationUserService.login(this.user);
  }

  redirectReg(): void {
    this.router.navigate([this.registration]);
  }

  ngOnDestroy(): void {
    this.authorizationUserService.resetErrorField();
  }
}
