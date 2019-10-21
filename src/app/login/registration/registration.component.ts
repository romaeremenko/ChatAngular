import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private auth: AuthService,  private router: Router) { }

  ngOnInit() {
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }
}
