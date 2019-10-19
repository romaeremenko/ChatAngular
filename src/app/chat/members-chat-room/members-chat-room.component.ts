import {Component, OnInit} from '@angular/core';
import {ChatAPIService} from '../../service/chatAPI/chat-api.service';
import {Member} from '../../interface/chat/member';

@Component({
  selector: 'app-members-chat-room',
  templateUrl: './members-chat-room.component.html',
  styleUrls: ['./members-chat-room.component.css']
})
export class MembersChatRoomComponent implements OnInit {

  members: Member[] = [];

  constructor(private chat: ChatAPIService) {
  }

  ngOnInit() {
    this.chat.getMembers().subscribe(resp => {
        resp.forEach(r => {
          this.members.push({username: r.username, status: r.status === 'active' ? true : false});
        });
        console.log(this.members);
      }
    );
  }

  countOnlineMembers(): number {
    return this.members.filter(member => member.status).length;
  }

}
