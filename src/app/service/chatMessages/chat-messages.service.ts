import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject, interval, Observable} from 'rxjs';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {Message} from '../../interface/chat/message';
import {CompareDate} from '../compareDate/compare-date.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {

  static messages = new BehaviorSubject([]);
  static messagesLength = 0;

  constructor(private chatAPIService: ChatAPIService, private dateService: CompareDate, @Inject(DOCUMENT) private document: HTMLDocument) {
  }

  public getMessages(id) {
    return interval(100).subscribe(_ => {
      this.chatAPIService.getMessages(id).subscribe((messages: Message[]) => {
        if (ChatMessagesService.messagesLength !== messages.length) {
          console.log(messages);
          ChatMessagesService.messages.next(messages);
          ChatMessagesService.messagesLength = messages.length;
          this.dateService.previousDate = '0';
        }
      });
    });
  }

}
