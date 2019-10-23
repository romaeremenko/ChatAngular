import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {Message} from '../../../interface/chat/message';
import {CompareDate} from '../../../service/compareDate/compare-date.service';
import {ChatAPIService} from '../../../service/chatAPI/chat-api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {

  @Input() messageFromUser: Message;

  cashResult = '';

  constructor(private dateService: CompareDate, private chatAPIService: ChatAPIService) {

  }

  get newDate() {
    // if (!this.cashResult) {
    //   this.cashResult = this.dateService.compareDate(this.messageFromUser.datetime);
    // }
    // return this.cashResult;
    return this.dateService.compareDate(this.messageFromUser.datetime);
  }

  messageFromMyself(): boolean {
    return this.messageFromUser.username === this.chatAPIService.user.username;
  }
}
