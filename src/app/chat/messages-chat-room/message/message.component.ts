import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../interface/chat/message';
import {DateService} from '../../../service/date/date.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {

  @Input() messageFromUser: Message;

  constructor(private dateService: DateService) {

  }

  get newDate() {
    return this.dateService.compareDate(this.messageFromUser.datetime);
  }
}
