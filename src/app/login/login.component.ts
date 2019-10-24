import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isAuth) {
      router.navigate(['/chatroom/MAIN']);
    }
  }

  redirectReg() {
    this.router.navigate(['/registration']);
  }

  isChatRouteActivated() {
    this.router.navigate(['/chatroom']);
  }
}
