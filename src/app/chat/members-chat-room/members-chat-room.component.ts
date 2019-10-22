import {Component, ElementRef, OnInit} from '@angular/core';
import {ChatAPIService} from '../../service/chatAPI/chat-api.service';
import {Member} from '../../interface/chat/member';
import {User} from '../../interface/chat/users';
import {ChatMembersService} from '../../service/chatMembers/chat-members.service';

@Component({
  selector: 'app-members-chat-room',
  templateUrl: './members-chat-room.component.html',
  styleUrls: ['./members-chat-room.component.css']
})
export class MembersChatRoomComponent implements OnInit {

  members = ChatMembersService.members;
  titleStyle = `containerName marginName name sairaRegular18`;

  constructor(private chat: ChatAPIService) {
  }

  ngOnInit() {
    this.chatMembersService.getMembers();
    // ChatMembersService.members.subscribe(members => {
    //   //console.log(members);
    // });
  }

  countOnlineMembers(): void {
    return this.elRef.nativeElement.querySelectorAll('.online').length;
  }

}
