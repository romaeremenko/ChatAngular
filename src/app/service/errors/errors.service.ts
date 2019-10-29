import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  private wrongLogin = 'Http failure response for https://studentschat.herokuapp.com/users/login: 500 Internal Server Error';
  private wrongPassword = 'Http failure response for https://studentschat.herokuapp.com/users/login: 0 Unknown Error';
  private wrongRegRequest = 'Http failure response for https://studentschat.herokuapp.com/users/register: 403 Forbidden';


  constructor() {
  }

  loginRequest(response): string {
    if (response === this.wrongLogin || response === this.wrongPassword) {
      return 'Неверный логин или пароль';
    }
  }

  regRequest(response): string {
    if (response === this.wrongRegRequest) {
      return 'Логин уже занят';
    }
    // if (response === this.wrongLogin || response === this.wrongPassword) {
    //   return 'Неверный логин или пароль';
    // }
  }
}
