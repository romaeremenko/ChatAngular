import {Component, OnDestroy} from '@angular/core';
import {AuthorizationUserService} from '../../service/auth/authorization-user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../service/chatAPI/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnDestroy {
  private login = '/login';
  private loginField = 'andreyyaz';
  private passwordField = '1234';

  constructor(
    private authorizationUserService: AuthorizationUserService,
    private router: Router) {
  }

  redirectLogin() {
    this.router.navigate([this.login]);
  }

  ngOnDestroy() {
    this.authorizationUserService.resetErrorField();
  }
}
