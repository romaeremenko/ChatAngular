import { Component, OnDestroy } from '@angular/core';
import { AuthorizationUserService } from '../service/auth/authorization-user.service';
import { Router } from '@angular/router';
import { ChatService } from '../service/chatAPI/chat.service';
import { Location } from '@angular/common';



class MockAuthService {
  login({ loginField, passwordField }): boolean {
    return loginField === 'andreyyaz';
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{provide: AuthorizationUserService, useClass: MockAuthService}]
})
export class LoginComponent implements OnDestroy {
  private registration = '/registration';
  user = {
    loginField: 'andreyyaz',
    passwordField: '1234'
  };

  constructor(
    private authorizationUserService: AuthorizationUserService,
    private router: Router,
    private location: Location
  ) {}

  login(){
    return this.authorizationUserService.login(this.user);
    return true;
  }

  redirectReg(): void {
    this.router.navigate([this.registration]);
  }

  ngOnDestroy(): void {
    this.authorizationUserService.resetErrorField();
  }
}


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnDestroy {
//   private registration = '/registration';
//   user = {
//     loginField: 'andreyyaz',
//     passwordField: '1234'
//   };
//
//   constructor(
//     private authorizationUserService: AuthorizationUserService,
//     // private router: Router,
//     // private chatAPIService: ChatService,
//     // private location: Location
//   ) {}
//
//   redirectReg(): void {
//     this.router.navigate([this.registration]);
//   }
//
//   ngOnDestroy(): void {
//     this.authorizationUserService.resetErrorField();
//   }
// }
