import { Component, OnInit } from '@angular/core';
import {ChatMessagesService} from '../../service/chatMessages/chat-messages.service';

@Component({
  selector: 'app-messages-chat-room',
  templateUrl: './messages-chat-room.component.html',
  styleUrls: ['./messages-chat-room.component.css']
})
export class MessagesChatRoomComponent implements OnInit {

  messages = ChatMessagesService.messages;

  constructor(private chatMessagesService: ChatMessagesService) { }

  ngOnInit() {
    this.chatMessagesService.getMessages();
    // ChatMessagesService.messages.subscribe(messages => {
    //   console.log(messages);
    // });
  }

}
