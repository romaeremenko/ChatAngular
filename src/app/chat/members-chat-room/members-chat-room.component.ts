import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ChatAPIService} from '../../service/chatAPI/chat-api.service';
import {Member} from '../../interface/chat/member';
import {User} from '../../interface/chat/users';
import {ChatMembersService} from '../../service/chatMembers/chat-members.service';

@Component({
  selector: 'app-members-chat-room',
  templateUrl: './members-chat-room.component.html',
  styleUrls: ['./members-chat-room.component.css']
})
export class MembersChatRoomComponent implements OnInit, OnDestroy {
  private chatMembers;

  members = ChatMembersService.members;

  constructor(private chatMembersService: ChatMembersService, private elRef: ElementRef) { // chat -> chatAPIService
  }

  ngOnInit() {
    this.chatMembers = this.chatMembersService.getMembers();
    // ChatMembersService.members.subscribe(members => {
    //   //console.log(members);
    // });
  }

  countOnlineMembers(): void {
    return this.elRef.nativeElement.querySelectorAll('.online').length;
  }

  ngOnDestroy() {
    this.chatMembers.unsubscribe();
  }

}
