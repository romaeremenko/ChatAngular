import { Injectable } from '@angular/core';
import { ChatService } from '../chatAPI/chat.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ChatMessagesService } from '../chatMessages/chat-messages.service';
import { UserResponce } from '../../interface/server/userResponce';

@Injectable()
export class RedirectToChatService {
  private linkChatroom: string;

  constructor(
    private router: Router,
    private сhatService: ChatService,
    private chatMessagesService: ChatMessagesService,
    private localStorageService: LocalStorageService
  ) {}

  private setlinkChatroom(url: string): void {
    this.linkChatroom = url;
  }

  private redirectToChatroom(path: string): void {
    this.router.navigate([`${path}`]);
  }

  public redirectTo(
    resp: UserResponce,
    loginField: string,
    passwordField: string,
    roomName: string
  ) {
    this.сhatService.user.info = resp;
    this.localStorageService.setUserLoggedIn({
      loginField,
      passwordField
    });
    this.setlinkChatroom('/chatroom/' + roomName);
    this.redirectToChatroom(this.linkChatroom);
  }
}
