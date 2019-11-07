import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {Message} from '../../interface/chat/message';
import {CompareDate} from '../compareDate/compare-date.service';
import {DOCUMENT} from '@angular/common';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  static messages = new BehaviorSubject([]);
  static messagesLength = 0;
  static room = {
    id: 'MAIN',
    name: 'Main',
    set info(resp) {
      this.id = resp.chatroom_id;
      this.name = resp.chatroom_name;
    }
  };
  private avatarId;

  constructor(private chatAPIService: ChatAPIService, private dateService: CompareDate, @Inject(DOCUMENT) private document: HTMLDocument) {
  }

  public getMessages(): Subscription {
    ChatMessagesService.messagesLength = 0;
    return timer(0, 5000)
      .pipe(
        switchMap(() => this.chatAPIService.getMessages(ChatMessagesService.room.id))
      ).subscribe((messages: Message[]) => {
        this.isNewMessages(messages);
      });
  }

  private isNewMessages(messages: Message[]): void {
    if (this.condition(messages)) {
      messages = messages.map(message => {
        return Object.assign({}, message, {avatarId: this.chatAPIService.usersAvatars[message.username]});
      });
      ChatMessagesService.messages.next(messages);
      ChatMessagesService.messagesLength = messages.length;
      this.avatarId = this.chatAPIService.user.avatarId;
      this.compareDate.previousDate = '0';
    }
  }

  private condition(messages: Message[]): boolean {
    return ChatMessagesService.messagesLength !== messages.length ||
      messages.length === 0 ||
      this.avatarId !== this.chatAPIService.user.avatarId;
  }
}
