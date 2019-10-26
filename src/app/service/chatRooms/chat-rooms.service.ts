import {Injectable} from '@angular/core';
import {BehaviorSubject, interval} from 'rxjs';
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

  constructor(private chatAPIService: ChatAPIService) {
  }

  public getChats() {
    return interval(5000).subscribe(_ => {
      this.chatAPIService.getChats(this.chatAPIService.user.username).pipe(map(user => user.chats)).subscribe((chats: Chatroom[]) => {
        if (ChatRoomsService.chatsLength !== chats.length) {
          ChatRoomsService.chats.next(chats);
          ChatRoomsService.chatsLength = chats.length;
        }
      });
    });
  }
}
