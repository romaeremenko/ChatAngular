import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {User} from '../../interface/chat/users';
import {UserResponce} from '../../interface/server/userResponce';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginField = 'andreyyaz';
  private passwordField = '1234';
  private linkLogin = '/login';
  private linkChatroom;
  public isAuth = false;

  constructor(private router: Router, private сhatAPIService: ChatAPIService) {
  }

  login() {
    this.сhatAPIService.isExist(this.loginField, this.passwordField).subscribe((resp: UserResponce) => {
      console.log(resp);
      this.getUsernameAndId(resp);
      this.linkChatroom = '/chatroom/' + resp.shatroom_id;
      this.isAuth = (resp.status === 'active');
      this.redirectTo(this.linkChatroom);
    });
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
      // this.redirectTo(this.linkChatroom);
      return of(this.isAuth);
    } else {
      this.redirectTo(this.linkLogin);
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
