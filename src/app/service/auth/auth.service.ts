import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {User} from '../../interface/chat/users';
import {UserResponce} from '../../interface/server/userResponce';
import {ChatMessagesService} from '../chatMessages/chat-messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth = false;
  public responce = '';
  private loginField = 'andreyyaz';
  private passwordField = '1234';
  private linkLogin = '/login';
  private linkChatroom: string;

  constructor(private router: Router, private сhatAPIService: ChatAPIService, private chatMessagesService: ChatMessagesService, private errorsService: ErrorsService) {
  }

  login(): void {
    this.сhatAPIService.isExist(this.loginField, this.passwordField).subscribe((resp: UserResponce) => {
      this.сhatAPIService.user.info = resp;
      if (resp.chatroom_id || resp.chatroom_name) {
        ChatMessagesService.room.info = resp;
      }
      this.setlinkChatroom('/chatroom/' + ChatMessagesService.room.name.split(' ').join(''));
      this.isAuth = (resp.status === 'active');
      this.redirectToChatroom(this.linkChatroom);
    }, resp => {
      this.responce = resp.error.message;
    });
  }

  registration(): void {
    this.сhatAPIService.registration(this.loginField, this.passwordField).subscribe((resp: UserResponce) => {
      if (resp) {
        this.setlinkChatroom('/chatroom/Main');
        this.сhatAPIService.user.info = resp;
        this.isAuth = true;
        this.redirectToChatroom(this.linkChatroom);
      }
    }, resp => {
      this.responce = resp.error.message;
    });
  }

  isAutenticated(): Observable<boolean> {
    if (!this.isAuth) {
      this.redirectToChatroom(this.linkLogin);
    }

    return of(this.isAuth);
  }

  redirectToChatroom(path: string): void {
    this.router.navigate([`${path}`]);
  }

  resetResponseField(): void {
    this.responce = '';
  }

  private setlinkChatroom(url: string): void {
    this.linkChatroom = url;
  }
}
