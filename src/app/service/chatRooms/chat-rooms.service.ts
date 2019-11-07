import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {Chatroom} from '../../interface/chat/chatroom';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {
  static chats = new BehaviorSubject([]);
  static chatsLength = 0;

  constructor(private chatAPIService: ChatAPIService) {
  }

  public getChats(): Subscription {
    return timer(0, 5000)
      .pipe(
        switchMap(() => this.chatAPIService.getChats().pipe(map(user => user.chats)))
      ).subscribe((chats: Chatroom[]) => {
        this.isNewChatrooms(chats);
      });
  }

  public getIdByChatname(chatname: string) {
    let roomID;
    if (chatname === 'Main') {
      return 'MAIN';
    }

    this.subscr = ChatRoomsService.chats.subscribe((chats: Chatroom[]) => {
      chats = chats.filter((chat: Chatroom) => chat.name === chatname.split(/(?=[A-ZА-Я])/).join(' '));
      roomID = chats[0].chatroom_id;
    });

    this.subscr.unsubscribe();
    return roomID;
  }
}
