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
      this.getUsernameInfo(resp);
      if (!resp.chatroom_id || !resp.chatroom_name) {
        this.setRoom('MAIN', 'Main');
      } else {
        this.setRoom(resp.chatroom_id, resp.chatroom_name);
      }
      this.linkChatroom = '/chatroom/' + ChatMessagesService.room.name.split(' ').join('');
      this.isAuth = (resp.status === 'active');
      this.redirectTo(this.linkChatroom);
    }, error => {
      this.responce = this.errorsService.loginRequest(error.message);
    });
  }

  registration() {
    this.сhatAPIService.registration(this.loginField, this.passwordField).subscribe(resp => {
      if (resp) {
        this.setRoom('MAIN', 'Main');
        this.linkChatroom = '/chatroom/Main';
        this.getUsernameInfo(resp);
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
      return of(this.isAuth);
    } else {
      this.redirectTo(this.linkLogin);
      return of(this.isAuth);
    }
  }

  getUsernameInfo(resp) {
    this.сhatAPIService.user = {
      user_id: resp.user_id,
      username: resp.username,
      avatarId: resp.avatarId,
    };
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
