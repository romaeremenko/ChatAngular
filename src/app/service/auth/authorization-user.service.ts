import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chatAPI/chat.service';
import { UserResponce } from '../../interface/server/userResponce';
import { ChatMessagesService } from '../chatMessages/chat-messages.service';
import { AuthService } from '../chatAPI/auth.service';
import { RedirectToChatService } from './redirect-to-chat.service';

@Injectable()
export class AuthorizationUserService {
  public isAuth = false;
  public responce = '';

  constructor(
    private router: Router,
    private сhatService: ChatService,
    private authService: AuthService,
    private redirectToChatService: RedirectToChatService
  ) {}

  login({ loginField, passwordField }): void {
    this.authService.isExist(loginField, passwordField).subscribe(
      (resp: UserResponce) => {
        this.redirectToChatService.redirectTo(
          resp,
          loginField,
          passwordField,
          ChatMessagesService.room.name.split(' ').join('')
        );
        this.isAuth = true;
      },
      resp => {
        this.responce = resp.error.message;
      }
    );
  }

  registration(loginField, passwordField): void {
    this.authService
      .registration(loginField, passwordField)
      .subscribe(
        (resp: UserResponce) => {
          this.redirectToChatService.redirectTo(
            resp,
            loginField,
            passwordField,
            'Main'
          );
          this.isAuth = true;
        },
        resp => {
          this.responce = resp.error.message;
        }
      );
  }

  resetErrorField(): void {
    this.responce = '';
  }
}
