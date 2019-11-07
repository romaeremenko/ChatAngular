import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatMessagesService} from '../../service/chatMessages/chat-messages.service';
import {InputMessageService} from '../../service/inputMessage/input-message.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ResizedEvent} from 'angular-resize-event';

@Component({
  selector: 'app-messages-chat-room',
  templateUrl: './messages-chat-room.component.html',
  styleUrls: ['./messages-chat-room.component.css'],
})
export class MessagesChatRoomComponent implements OnInit, OnDestroy {
  @ViewChild('messagesRef', {static: false}) private messagesRef: ElementRef;
  @ViewChild('messageRef', {static: false}) private messageRef: ElementRef;
  private messages = ChatMessagesService.messages;
  private chatroomNameHeader = '';
  private chatRoom;
  private subscribtions: Subscription[] = [];

  constructor(private chatMessagesService: ChatMessagesService,
              private stringService: InputMessageService,
              private route: ActivatedRoute,
  ) {
    this.chatRoom = this.chatMessagesService.getMessages();
  }

  ngOnInit() {
    this.subscribtions.push(this.route.params.subscribe(() => {
      this.stringService.reset();
      this.chatRoom.unsubscribe();
      this.subscribtions.push(this.chatRoom = this.chatMessagesService.getMessages());
      this.chatroomNameHeader = ChatMessagesService.room.name;
    }));
  }

  onResized(event: ResizedEvent): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.messagesRef.nativeElement.scrollTo(0, this.messageRef.nativeElement.getBoundingClientRect().top);
  }

  ngOnDestroy() {
    this.subscribtions.forEach(subscribtion => subscribtion.unsubscribe());
  }
}
