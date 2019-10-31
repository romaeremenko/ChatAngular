import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {ChatAPIService} from '../service/chatAPI/chat-api.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  constructor(private authService: AuthService, private router: Router, private chatAPIService: ChatAPIService, private location: Location) {
    if (authService.isAuth) {
      this.location.back();
    }
  }

  redirectReg() {
    this.router.navigate(['/registration']);
  }

  isChatRouteActivated() {
    this.router.navigate(['/chatroom']);
  }

  ngOnDestroy() {
    this.authService.responce = '';
  }
}
