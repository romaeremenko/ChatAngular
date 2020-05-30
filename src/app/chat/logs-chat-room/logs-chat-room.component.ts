import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomsService } from '../../service/chatRooms/chat-rooms.service';

@Component({
  selector: 'app-logs-chat-room',
  templateUrl: './logs-chat-room.component.html',
  styleUrls: ['./logs-chat-room.component.css']
})
export class LogsChatRoomComponent implements OnInit, OnDestroy {
  private rooms = ChatRoomsService.chats;
  private logs;

  titleStyle = `containerName marginName name sairaRegular18`;

  constructor(
    private route: ActivatedRoute,
    private chatRoomsService: ChatRoomsService
  ) {}

  ngOnInit() {
    this.logs = this.chatRoomsService.getChats();
  }

  ngOnDestroy() {
    this.logs.unsubscribe();
  }
}
