import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {User} from '../../interface/chat/users';
import {UserResponce} from '../../interface/server/userResponce';
import {ChatMessagesService} from '../chatMessages/chat-messages.service';
import {ErrorsService} from '../errors/errors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginField = 'andreyyaz';
  private passwordField = '1234';
  private linkLogin = '/login';
  private linkChatroom;
  public isAuth = false;
  public responce = '';

  constructor(private router: Router, private сhatAPIService: ChatAPIService, private chatMessagesService: ChatMessagesService, private errorsService: ErrorsService) {
  }

  login() {
    this.сhatAPIService.isExist(this.loginField, this.passwordField).subscribe((resp: UserResponce) => {
        console.log(resp);
        this.getUsernameAndId(resp);
        if (!resp.chatroom_id || !resp.chatroom_name) {
          console.log('ddd');
          this.setRoom('MAIN', 'Main');
        } else {
          this.setRoom(resp.chatroom_id, resp.chatroom_name);
        }
        this.linkChatroom = '/chatroom/' + ChatMessagesService.room.name.split(' ').join('');
        this.isAuth = (resp.status === 'active');
      console.log(this.linkChatroom, this.isAuth);
        this.redirectTo(this.linkChatroom);
    }, error => {
      this.responce = this.errorsService.loginRequest(error.message);
    });
  }

  registration() {
    this.сhatAPIService.registration(this.loginField, this.passwordField).subscribe(resp => {
      if (resp) {
        this.getUsernameAndId(resp);
        this.isAuth = true;
        this.redirectTo(this.linkChatroom);
      }
    }, error => {
      console.log(error.message);
      this.responce = this.errorsService.regRequest(error.message);
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

  setRoom(id, name) {
    ChatMessagesService.room = {
      id,
      name,
    };
  }

}
