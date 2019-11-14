import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import {ChatService} from '../chatAPI/chat.service';
import {Chatroom} from '../../interface/chat/chatroom';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class ChatRoomsService {
  static chats = new BehaviorSubject([]);
  static chatsLength = 0;

  constructor(private chatAPIService: ChatService) {
  }

  public getChats(): Subscription {
    return timer(0, 5000)
      .pipe(
        switchMap(() => this.chatAPIService.getChats().pipe(map(user => user.chats)))
      ).subscribe((chats: Chatroom[]) => {
        this.isNewChatrooms(chats);
      });
  }

  private isNewChatrooms(chats: Chatroom[]): void {
    if (ChatRoomsService.chatsLength !== chats.length) {
      ChatRoomsService.chats.next(chats);
      ChatRoomsService.chatsLength = chats.length;
    }
  }
}
