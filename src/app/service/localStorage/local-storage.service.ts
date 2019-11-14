import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('isUserLoggedIn'));
  }

  setUserLoggedIn(data) {
    localStorage.setItem('isUserLoggedIn', JSON.stringify(data));
  }

  deleteUserLoggedIn() {
    localStorage.removeItem('isUserLoggedIn');
  }
}
