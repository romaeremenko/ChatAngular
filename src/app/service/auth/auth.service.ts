import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {User} from '../../interface/chat/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginField: string;

  private isAuth = false;

  constructor(private router: Router, private chatAPI: ChatAPIService) {
  }

  login() {
    this.chatAPI.isExist(this.loginField).subscribe((resp) => {
      console.log(resp);
      this.isAuth = resp;
      this.router.navigate(['/chatroom']);
    });

  }

  logout() {
    this.isAuth = false;
  }

  isAutenticated(): Observable<boolean> {
    if (this.isAuth) {
      return of(this.isAuth);
    } else {
      this.router.navigate(['/login']);
      return of(this.isAuth);
    }
  }


}
