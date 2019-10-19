import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {ChatAPIService} from '../../service/chatAPI/chat-api.service';

@Component({
  selector: 'app-header-chat-room',
  templateUrl: './header-chat-room.component.html',
  styleUrls: ['./header-chat-room.component.css']
})
export class HeaderChatRoomComponent implements OnInit {

  constructor(private logout: AuthService, private profile: ChatAPIService) { }

  ngOnInit() {
  }

}
