import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject, interval, Observable, timer} from 'rxjs';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {Message} from '../../interface/chat/message';
import {CompareDate} from '../compareDate/compare-date.service';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {

  static messages = new BehaviorSubject([]);
  static messagesLength = 0;
  static room;
  private avatarId;

  constructor(private chatAPIService: ChatAPIService, private dateService: CompareDate, @Inject(DOCUMENT) private document: HTMLDocument) {
  }

  public getMessages() {
    ChatMessagesService.messagesLength = 0;
    return timer(0, 5000).subscribe(_ => {
      this.chatAPIService.getMessages(ChatMessagesService.room.id).subscribe((messages: Message[]) => {
        if (ChatMessagesService.messagesLength !== messages.length || messages.length === 0 || this.avatarId !== this.chatAPIService.user.avatarId) {
          messages = messages.map(message => {
            return Object.assign({}, message, {avatarId: this.chatAPIService.usersAvatars[message.username]});
          });
          ChatMessagesService.messages.next(messages);
          ChatMessagesService.messagesLength = messages.length;
          this.avatarId = this.chatAPIService.user.avatarId;
          this.dateService.previousDate = '0';
        }
      });
    });
  }

}
