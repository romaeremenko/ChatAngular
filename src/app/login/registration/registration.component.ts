import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isAuth) {
      router.navigate(['/chatroom/MAIN']);
    }
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }
}
