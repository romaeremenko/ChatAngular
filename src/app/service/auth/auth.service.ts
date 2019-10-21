import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {User} from '../../interface/chat/users';
import {ChatResponce} from '../../interface/server/responce';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginField = 'loans';
  private passwordField = '132';
  private isAuth = false;
  private linkLogin = '/login';
  private linkChatroom = '/chatroom';

  constructor(private router: Router, private сhatAPIService: ChatAPIService) {
  }

  login() {
    this.сhatAPIService.isExist(this.loginField, this.passwordField).subscribe((resp: ChatResponce) => {
      this.getUsernameAndId(resp);
      this.isAuth = (resp.status === 'ok');
      this.redirectTo(this.linkChatroom);
    });

  }

  logout() {
    this.isAuth = false;
  }

  registration() {
    this.сhatAPIService.registration(this.loginField, this.passwordField).subscribe(resp => {
      if (resp) {
        this.getUsernameAndId(resp);
        this.isAuth = true;
        this.redirectTo(this.linkChatroom);
      }
    });
  }

  isAutenticated(): Observable<boolean> {
    if (this.isAuth) {
      this.redirectTo(this.linkChatroom);
      return of(this.isAuth);
    } else {
      this.router.navigate(['/login']);
      return of(this.isAuth);
    }
  }

  getUsernameAndId(resp) {
    this.сhatAPIService.user.user_id = resp.user_id;
    this.сhatAPIService.user.username = resp.username;
  }

  redirectTo(path): void {
    this.router.navigate([`${path}`]);
  }

}
