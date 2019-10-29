import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Chatroom} from '../../../interface/chat/chatroom';
import {Member} from '../../../interface/chat/member';
import {ChatAPIService} from '../../../service/chatAPI/chat-api.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, OnDestroy {
  titleStyle = `containerName marginName name sairaRegular18`;
  createRoom = false;
  subscr;
  title = '';

  @Input() member: Member;

  constructor(private chatAPIService: ChatAPIService) {
  }

  ngOnInit() {
  }

  submitForm(title: string) {
    console.log('dgdgf');
    this.subscr = this.chatAPIService.createChatRoom(this.member.username, title).subscribe(r => {
      console.log(r);
    });
    this.toggleCreateRoom();
  }

  createRoomWindow() {
    this.toggleCreateRoom();
  }

  exit() {
    this.toggleCreateRoom();
  }

  toggleCreateRoom() {
    this.createRoom = !this.createRoom;
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
}
