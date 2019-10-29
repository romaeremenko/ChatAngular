import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, timer} from 'rxjs';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {ChatMessagesService} from '../chatMessages/chat-messages.service';
import {Chatroom} from '../../interface/chat/chatroom';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {

  static chats = new BehaviorSubject([]);
  static chatsLength = 0;
  subscr;

  constructor(private chatAPIService: ChatAPIService) {
  }

  public getChats() {
    return timer(0, 5000).subscribe(_ => {
      this.chatAPIService.getChats(this.chatAPIService.user.username).pipe(map(user => user.chats)).subscribe((chats: Chatroom[]) => {
        if (ChatRoomsService.chatsLength !== chats.length) {
          ChatRoomsService.chats.next(chats);
          ChatRoomsService.chatsLength = chats.length;
        }
      });
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
