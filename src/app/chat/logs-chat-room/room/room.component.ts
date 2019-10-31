import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../../interface/chat/message';
import {Chatroom} from '../../../interface/chat/chatroom';
import {ChatMessagesService} from '../../../service/chatMessages/chat-messages.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatRoomsService} from '../../../service/chatRooms/chat-rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {

  @Input() room: Chatroom;
  private routeParams;
  titleStyle = `containerName marginName name sairaRegular18`;

  constructor(private chatMessagesService: ChatMessagesService, private route: Router, private link: ActivatedRoute, private chatRoomsService: ChatRoomsService) {

  }

  ngOnInit() {
    this.routeParams = this.link.params.subscribe(_ => {
      this.setActive(ChatMessagesService.room.name);
    });
  }

  // changeRoom() {
  // }

  setRouterLink() {
    const link = '../chatroom/' + this.room.name.split(' ').join('');
    if (this.room.name === 'Main') {
      ChatMessagesService.room = {
        id: 'MAIN',
        name: 'Main'
      };
    } else {
      ChatMessagesService.room = {
        id: this.room.chatroom_id,
        name: this.room.name
      };
    }
    this.route.navigate([link]);
    this.setActive(this.room.name);
  }

  setActive(chatName) {
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

}
