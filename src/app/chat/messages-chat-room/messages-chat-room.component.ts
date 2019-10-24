import {AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatMessagesService} from '../../service/chatMessages/chat-messages.service';
import {InputMessageService} from '../../service/inputMessage/input-message.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Message} from '../../interface/chat/message';
import {CompareDate} from '../../service/compareDate/compare-date.service';
import {BehaviorSubject, Observable} from 'rxjs';
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
  private chatRoomId: string  = 'MAIN';
  private chatRoom;
  private routeParams;

  constructor(private chatMessagesService: ChatMessagesService,
              private stringService: InputMessageService,
              private route: ActivatedRoute,
              private compareDate: CompareDate
  ) {
  }

  ngOnInit() {
    this.routeParams = this.route.params.subscribe(routeParams => {
      if (!!this.chatRoom) {
        this.chatRoomId = routeParams.id;
        this.chatRoom.unsubscribe();
        this.stringService.reset();
      }
      this.chatRoom = this.chatMessagesService.getMessages(routeParams.id);
    });
  }

  onResized(event: ResizedEvent) {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesRef.nativeElement.scrollTo(0, this.messageRef.nativeElement.getBoundingClientRect().top);
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy() {
    this.chatRoom.unsubscribe();
    this.routeParams.unsubscribe();
  }

}
