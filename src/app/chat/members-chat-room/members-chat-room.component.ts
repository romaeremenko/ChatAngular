import { Component, ElementRef, OnInit } from '@angular/core';
import { ChatMembersService } from '../../service/chatMembers/chat-members.service';

@Component({
  selector: 'app-members-chat-room',
  templateUrl: './members-chat-room.component.html',
  styleUrls: ['./members-chat-room.component.css']
})
export class MembersChatRoomComponent implements OnInit {
  members = ChatMembersService.members;
  private chatMembers;

  constructor(
    private chatMembersService: ChatMembersService,
    private elRef: ElementRef
  ) {
    this.chatMembersService.getMembers();
  }

  ngOnInit() {
    ChatMembersService.members.subscribe(members => {
      this.chatMembers = members;
    });
  }

  countOnlineMembers(): number {
    return this.elRef.nativeElement.querySelectorAll('.online')
      .length;
  }
}
