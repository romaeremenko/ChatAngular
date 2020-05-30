import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chatroom } from '../../../interface/chat/chatroom';
import { ChatMessagesService } from '../../../service/chatMessages/chat-messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ShowTabsService } from '../../../service/showTabs/show-tabs.service';
import {PhoneViewService} from "../../../service/phoneView/phone-view.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  @Input() room: Chatroom;
  titleStyle = `containerName marginName name sairaRegular18`;
  private routeParams;
  private isPhone;

  constructor(
    private chatMessagesService: ChatMessagesService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private showTabsService: ShowTabsService,
    private phoneViewService: PhoneViewService
  ) {
    this.isPhone = this.phoneViewService.getIsPhone();
  }

  ngOnInit() {
    this.routeParams = this.activatedRoute.params.subscribe(() => {
      this.setActive(ChatMessagesService.room.name);
    });
  }

  setRouterLink(): void {
    const link = '../chatroom/' + this.room.name.split(' ').join('');
    if (this.room.name === 'Main') {
      this.setRoom({ chatroom_id: 'MAIN', chatroom_name: 'Main' });
    } else {
      this.setRoom({
        chatroom_id: this.room.chatroom_id,
        chatroom_name: this.room.name
      });
    }
    this.route.navigate([link]);
    this.setActive(this.room.name);
  }

  setActive(chatName: string): void {
    const arrayChats = document.getElementsByClassName(this.titleStyle);
    Array.from(arrayChats).forEach((el: HTMLElement) => {
      if (chatName === el.innerText) {
        el.parentElement.parentElement.className = 'alignLeft chatRoom active';
      } else {
        el.parentElement.parentElement.className = 'alignLeft chatRoom';
      }
    });
  }

  ngOnDestroy() {
    this.routeParams.unsubscribe();
  }

  private setRoom(info): void {
    ChatMessagesService.room.info = info;
  }
}
