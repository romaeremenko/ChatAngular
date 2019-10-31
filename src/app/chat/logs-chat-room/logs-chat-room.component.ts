import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatRoomsService} from '../../service/chatRooms/chat-rooms.service';
import {ChatAPIService} from '../../service/chatAPI/chat-api.service';
import {ChatMessagesService} from '../../service/chatMessages/chat-messages.service';

@Component({
  selector: 'app-logs-chat-room',
  templateUrl: './logs-chat-room.component.html',
  styleUrls: ['./logs-chat-room.component.css']
})
export class LogsChatRoomComponent implements OnInit, OnDestroy {

  private rooms = ChatRoomsService.chats;
  private logs;

  titleStyle = `containerName marginName name sairaRegular18`;

  constructor(private route: ActivatedRoute, private chatRoomsService: ChatRoomsService, private router: Router) {
  }

  ngOnInit() {
    this.logs = this.chatRoomsService.getChats();
  }

  ngOnDestroy() {
    this.logs.unsubscribe();
  }
}
