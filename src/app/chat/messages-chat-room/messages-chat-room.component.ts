import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatMessagesService} from '../../service/chatMessages/chat-messages.service';
import {InputMessageService} from '../../service/inputMessage/input-message.service';

@Component({
  selector: 'app-messages-chat-room',
  templateUrl: './messages-chat-room.component.html',
  styleUrls: ['./messages-chat-room.component.css']
})
export class MessagesChatRoomComponent implements OnInit {

  messages = ChatMessagesService.messages;

  constructor(private chatMessagesService: ChatMessagesService, private stringService: InputMessageService, private elRef: ElementRef) {
  }

  ngOnInit() {
    this.chatMessagesService.getMessages();
    this.stringService.reset();
    setTimeout( () => {    this.scrollToBottom();}, 2000);
  }

  scrollToBottom(): void {
    try {
      const objDiv = this.elRef.nativeElement.getElementById('messages');
      objDiv.scrollTo(500, 0);
      console.log(objDiv.scrollTop, objDiv.scrollHeight);
      console.log(objDiv.scrollTop);
    } catch (err) {
      console.log(err);
    }
  }

}
