import {Component, OnInit} from '@angular/core';
import {ChatAPIService} from '../../service/chatAPI/chat-api.service';
import {ChatMessagesService} from '../../service/chatMessages/chat-messages.service';

@Component({
  selector: 'app-header-chat-room',
  templateUrl: './header-chat-room.component.html',
  styleUrls: ['./header-chat-room.component.css']
})
export class HeaderChatRoomComponent implements OnInit {

  createChangeInfo = false;

  constructor(private chatAPIService: ChatAPIService, private chatMessagesService: ChatMessagesService) {
  }

  ngOnInit() {
  }

  logout() {
    this.chatAPIService.logout(ChatMessagesService.room.id, ChatMessagesService.room.name).subscribe( _ => {console.log(_)});
    window.location.reload();
  }

  submitForm(information) {
    this.chatAPIService.postInfo(information);
    this.toggleChangeInfoWindow();
  }

  createChangeInfoWindow() {
    this.toggleChangeInfoWindow();
  }

  exit() {
    this.toggleChangeInfoWindow();
  }

  toggleChangeInfoWindow() {
    this.createChangeInfo = !this.createChangeInfo;
  }
}
