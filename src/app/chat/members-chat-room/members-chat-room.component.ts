import { Component, ElementRef, OnInit } from '@angular/core';
import { ChatMembersService } from '../../service/chatMembers/chat-members.service';
import { ShowTabsService } from '../../service/showTabs/show-tabs.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import {PhoneViewService} from "../../service/phoneView/phone-view.service";

@Component({
  selector: 'app-members-chat-room',
  templateUrl: './members-chat-room.component.html',
  styleUrls: ['./members-chat-room.component.css']
})
export class MembersChatRoomComponent implements OnInit {
  members = ChatMembersService.members;
  private chatMembers;
  private isPhone;

  constructor(
    private chatMembersService: ChatMembersService,
    private elRef: ElementRef,
    private showTabsService: ShowTabsService,
    private phoneViewService: PhoneViewService
  ) {
    this.isPhone = this.phoneViewService.getIsPhone();
    this.chatMembersService.getMembers();
  }

  ngOnInit() {
    ChatMembersService.members.subscribe(members => {
      this.chatMembers = members;
    });
  }

  countOnlineMembers(): number {
    return this.elRef.nativeElement.querySelectorAll('.online').length;
  }

  showChat() {
    this.showTabsService.setDisplayMembers();
  }
}
