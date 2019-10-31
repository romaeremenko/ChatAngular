import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnDestroy {

  constructor(private authService: AuthService, private router: Router, private location: Location) {
    if (authService.isAuth) {
      this.location.back();
    }
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.authService.responce = '';
  }
}
