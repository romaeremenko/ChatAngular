import {Injectable} from '@angular/core';
import {BehaviorSubject, interval} from 'rxjs';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {Message} from '../../interface/chat/message';
import {DateService} from '../date/date.service';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {

  static messages = new BehaviorSubject([]);

  constructor(private chatAPIService: ChatAPIService, private dateService: DateService) {
  }

  public getMessages() {
    // interval(1000).subscribe( _ => {
      this.chatAPIService.getMessages().subscribe((messages: Message[]) => {
        console.log(messages);
        this.dateService.previousDate = '0';
        ChatMessagesService.messages.next(messages);
      });
    // });
  }

}
